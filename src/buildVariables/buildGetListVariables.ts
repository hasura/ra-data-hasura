import set from 'lodash/set';
import omit from 'lodash/omit';
import getFinalType from '../helpers/getFinalType';
import type {
  FetchType,
  IntrospectionResult,
  IntrospectedResource,
} from '../types';

type BuildGetListVariables = (
  introspectionResults: IntrospectionResult
) => (
  resource: IntrospectedResource,
  aorFetchType: FetchType,
  params: any
) => any;

const SPLIT_TOKEN = '#';
const MULTI_SORT_TOKEN = ',';
const SPLIT_OPERATION = '@';

export const buildGetListVariables: BuildGetListVariables =
  () => (resource, _, params) => {
    const result: any = {};
    let { filter: filterObj = {} } = params;
    const { customFilters = [] } = params;

    const distinctOnField = 'distinct_on';
    /** Setting "distinct_on" to be the `filters` object attribute to be used inside RA
     * and setting to a `distinct_on` variable
     * and removing from the filter object
     */
    const { distinct_on = '' } = filterObj;
    filterObj = omit(filterObj, [distinctOnField]);

    /**
     * Nested entities are parsed by CRA, which returns a nested object
     * { 'level1': {'level2': 'test'}}
     * instead of { 'level1.level2': 'test'}
     * That's why we use a HASH for properties, when we declared nested stuff at CRA:
     * level1#level2@_ilike
     */

    /**
         keys with comma separated values
        {
            'title@ilike,body@like,authors@similar': 'test',
            'col1@like,col2@like': 'val'
        }
     */
    const orFilterKeys = Object.keys(filterObj).filter((e) => e.includes(','));

    /**
        format filters
        {
            'title@ilike': 'test',
            'body@like': 'test',
            'authors@similar': 'test',
            'col1@like': 'val',
            'col2@like': 'val'
        }
    */
    const orFilterObj = orFilterKeys.reduce((acc, commaSeparatedKey) => {
      const keys = commaSeparatedKey.split(',');
      return {
        ...acc,
        ...keys.reduce((acc2, key) => {
          return {
            ...acc2,
            [key]: filterObj[commaSeparatedKey],
          };
        }, {}),
      };
    }, {});
    filterObj = omit(filterObj, orFilterKeys);

    const makeNestedFilter = (obj: any, operation: string): any => {
      if (Object.keys(obj).length === 1) {
        const [key] = Object.keys(obj);
        return { [key]: makeNestedFilter(obj[key], operation) };
      } else {
        return { [operation]: obj };
      }
    };

    const filterReducer = (obj: any) => (acc: any, key: any) => {
      let filter;
      if (key === 'ids') {
        filter = { id: { _in: obj['ids'] } };
      } else if (Array.isArray(obj[key])) {
        let [keyName, operation = '_in', opPath] = key.split(SPLIT_OPERATION);
        let value = opPath
          ? set({}, opPath.split(SPLIT_TOKEN), obj[key])
          : obj[key];
        filter = set({}, keyName.split(SPLIT_TOKEN), { [operation]: value });
      } else if (obj[key] && obj[key].format === 'hasura-raw-query') {
        filter = set({}, key.split(SPLIT_TOKEN), obj[key].value || {});
      } else {
        let [keyName, operation = ''] = key.split(SPLIT_OPERATION);
        let operator;
        if (operation === '{}') operator = {};
        const field = resource.type.fields.find((f) => f.name === keyName);
        if (field) {
          switch (getFinalType(field.type).name) {
            case 'String':
              operation = operation || '_ilike';
              if (!operator)
                operator = {
                  [operation]: operation.includes('like')
                    ? `%${obj[key]}%`
                    : obj[key],
                };
              break;
            case 'jsonb':
              try {
                const parsedJSONQuery = JSON.parse(obj[key]);
                if (parsedJSONQuery) {
                  operator = {
                      [operation || '_contains']: parsedJSONQuery
                  };
                }
              } catch (ex) {}
              break;
            default:
              if (!operator)
                operator = {
                  [operation || '_eq']: operation.includes('like')
                    ? `%${obj[key]}%`
                    : obj[key],
                };
          }
        } else {
          // Else block runs when the field is not found in Graphql schema.
          // Most likely it's nested. If it's not, it's better to let
          // Hasura fail with a message than silently fail/ignore it
          if (!operator)
            operator = {
              [operation || '_eq']: operation.includes('like')
                ? `%${obj[key]}%`
                : obj[key],
            };
        }
        filter = set({}, keyName.split(SPLIT_TOKEN), operator);
      }
      return [...acc, filter];
    };
    const andFilters = Object.keys(filterObj)
      .reduce(filterReducer(filterObj), customFilters)
      .filter(Boolean);
    const orFilters = Object.keys(orFilterObj)
      .reduce(filterReducer(orFilterObj), [])
      .filter(Boolean);

    result['where'] = {
      _and: andFilters,
      ...(orFilters.length && { _or: orFilters }),
    };

    if (params.pagination) {
      result['limit'] = parseInt(params.pagination.perPage, 10);
      result['offset'] =
        (params.pagination.page - 1) * params.pagination.perPage;
    }

    if (params.sort) {
      const { field, order } = params.sort;
      const hasMultiSort =
        field.includes(MULTI_SORT_TOKEN) || order.includes(MULTI_SORT_TOKEN);
      if (hasMultiSort) {
        const fields = field.split(MULTI_SORT_TOKEN);
        const orders = order
          .split(MULTI_SORT_TOKEN)
          .map((order: string) => order.toLowerCase());

        if (fields.length !== orders.length) {
          throw new Error(
            `The ${
              resource.type.name
            } list must have an order value for each sort field. Sort fields are "${fields.join(
              ','
            )}" but sort orders are "${orders.join(',')}"`
          );
        }

        const multiSort = fields.map((field: any, index: number) =>
          makeSort(field, orders[index])
        );
        result['order_by'] = multiSort;
      } else {
        result['order_by'] = makeSort(field, order);
      }
    }

    if (distinct_on) {
      result['distinct_on'] = distinct_on;
    }

    return result;
  };

/**
 * if the field contains a SPLIT_OPERATION, it means it's column ordering option.
 *
 * @example
 * ```
 * makeSort('title', 'ASC') => { title: 'asc' }
 * ```
 * @example
 * ```
 * makeSort('title@nulls_last', 'ASC') => { title: 'asc_nulls_last' }
 * ```
 * @example
 * ```
 * makeSort('title@nulls_first', 'ASC') => { title: 'asc_nulls_first' }
 * ```
 *
 */
const makeSort = (field: string, sort: 'ASC' | 'DESC') => {
  const [fieldName, operation] = field.split(SPLIT_OPERATION);
  const fieldSort = operation ? `${sort}_${operation}` : sort;
  return set({}, fieldName, fieldSort.toLowerCase());
};
