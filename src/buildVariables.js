import isEqual from 'lodash/isEqual';
import set from 'lodash/set';
import omit from 'lodash/omit';
import {
  GET_ONE,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  DELETE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE_MANY,
} from './fetchActions';

const SPLIT_TOKEN = '#';

import getFinalType from './getFinalType';

const buildGetListVariables = (introspectionResults) => (
  resource,
  aorFetchType,
  params
) => {
  const result = {};
  let { filter: filterObj = {} } = params;
  const { customFilters = [] } = params;

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

  const makeNestedFilter = (obj, operation) => {
    if (Object.keys(obj).length === 1) {
      const [key] = Object.keys(obj);
      return { [key]: makeNestedFilter(obj[key], operation) };
    } else {
      return { [operation]: obj };
    }
  };

  const filterReducer = (obj) => (acc, key) => {
    let filter;
    if (key === 'ids') {
      filter = { id: { _in: obj['ids'] } };
    } else if (Array.isArray(obj[key])) {
      filter = { [key]: { _in: obj[key] } };
    } else if (obj[key] && obj[key].format === 'hasura-raw-query') {
      filter = { [key]: obj[key].value || {} };
    } else {
      let [keyName, operation = ''] = key.split('@');
      let operator;
      const field = resource.type.fields.find((f) => f.name === keyName);
      if (field) {
        switch (getFinalType(field.type).name) {
          case 'String':
            operation = operation || '_ilike';
            operator = {
              [operation]: operation.includes('like')
                ? `%${obj[key]}%`
                : obj[key],
            };
            filter = set({}, keyName.split(SPLIT_TOKEN), operator);
            break;
          default:
            operator = {
              [operation]: operation.includes('like')
                ? `%${obj[key]}%`
                : obj[key],
            };
            filter = set({}, keyName.split(SPLIT_TOKEN), {
              [operation || '_eq']: obj[key],
            });
        }
      } else {
        // Else block runs when the field is not found in Graphql schema.
        // Most likely it's nested. If it's not, it's better to let
        // Hasura fail with a message than silently fail/ignore it
        operator = {
          [operation || '_eq']: operation.includes('like')
            ? `%${obj[key]}%`
            : obj[key],
        };
        filter = set({}, keyName.split(SPLIT_TOKEN), operator);
      }
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
    result['offset'] = parseInt(
      (params.pagination.page - 1) * params.pagination.perPage,
      10
    );
  }

  if (params.sort) {
    result['order_by'] = set(
      {},
      params.sort.field,
      params.sort.order.toLowerCase()
    );
  }

  return result;
};

/**
 * Returns a reducer that converts the react-admin key-values to hasura-acceptable values
 *
 * Currently that means that dates should never be an empty string, but in the future that can be extended
 * See https://github.com/marmelab/react-admin/pull/6199
 *
 */
const typeAwareKeyValueReducer = (introspectionResults, resource, params) => (
  acc,
  key
) => {
  const type = introspectionResults.types.find(
    (t) => t.name === resource.type.name
  );
  const field = type.fields.find((t) => t.name === key);
  const value =
    field && field.type && field.type.name === 'date' && params.data[key] === ''
      ? null
      : params.data[key];
  return resource.type.fields.some((f) => f.name === key)
    ? {
        ...acc,
        [key]: value,
      }
    : acc;
};

const buildUpdateVariables = (introspectionResults) => (
  resource,
  aorFetchType,
  params,
  queryType
) => {
  const reducer = typeAwareKeyValueReducer(
    introspectionResults,
    resource,
    params
  );
  let permitted_fields = null;
  const resource_name = resource.type.name;
  if (resource_name) {
    let inputType = introspectionResults.types.find(
      (obj) => obj.name === `${resource_name}_set_input`
    );
    if (inputType) {
      let inputTypeFields = inputType.inputFields;
      if (inputTypeFields) {
        permitted_fields = inputTypeFields.map((obj) => obj.name);
      }
    }
  }
  return Object.keys(params.data).reduce((acc, key) => {
    // If hasura permissions do not allow a field to be updated like (id),
    // we are not allowed to put it inside the variables
    // RA passes the whole previous Object here
    // https://github.com/marmelab/react-admin/issues/2414#issuecomment-428945402

    // Fetch permitted fields from *_set_input INPUT_OBJECT and filter out any key
    // not present inside it
    if (permitted_fields && !permitted_fields.includes(key)) return acc;

    if (
      params.previousData &&
      isEqual(params.data[key], params.previousData[key])
    ) {
      return acc;
    }
    return reducer(acc, key);
  }, {});
};

const buildCreateVariables = (introspectionResults) => (
  resource,
  aorFetchType,
  params,
  queryType
) => {
  const reducer = typeAwareKeyValueReducer(
    introspectionResults,
    resource,
    params
  );
  return Object.keys(params.data).reduce(reducer, {});
};

const makeNestedTarget = (target, id) =>
  // This simple example should make clear what this function does
  // makeNestedTarget("a.b", 42)
  // => { a: { b: { _eq: 42 } } }
  target
    .split('.')
    .reverse()
    .reduce(
      (acc, key) => ({
        [key]: acc,
      }),
      { _eq: id }
    );

export default (introspectionResults) => (
  resource,
  aorFetchType,
  params,
  queryType
) => {
  switch (aorFetchType) {
    case GET_LIST:
      return buildGetListVariables(introspectionResults)(
        resource,
        aorFetchType,
        params,
        queryType
      );
    case GET_MANY_REFERENCE: {
      var built = buildGetListVariables(introspectionResults)(
        resource,
        aorFetchType,
        params,
        queryType
      );
      if (params.filter) {
        return {
          ...built,
          where: {
            _and: [
              ...built['where']['_and'],
              makeNestedTarget(params.target, params.id),
            ],
          },
        };
      }
      return {
        ...built,
        where: makeNestedTarget(params.target, params.id),
      };
    }
    case GET_MANY:
    case DELETE_MANY:
      return {
        where: { id: { _in: params.ids } },
      };

    case GET_ONE:
      return {
        where: { id: { _eq: params.id } },
        limit: 1,
      };

    case DELETE:
      return {
        where: { id: { _eq: params.id } },
      };
    case CREATE:
      return {
        objects: buildCreateVariables(introspectionResults)(
          resource,
          aorFetchType,
          params,
          queryType
        ),
      };

    case UPDATE:
      return {
        _set: buildUpdateVariables(introspectionResults)(
          resource,
          aorFetchType,
          params,
          queryType
        ),
        where: { id: { _eq: params.id } },
      };

    case UPDATE_MANY:
      return {
        _set: buildUpdateVariables(introspectionResults)(
          resource,
          aorFetchType,
          params,
          queryType
        ),
        where: { id: { _in: params.ids } },
      };
  }
};
