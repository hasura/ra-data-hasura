import type { IntrospectionField } from 'graphql';
import { IntrospectionResult, IntrospectedResource } from '../types';

/**
 * Returns a reducer that converts the react-admin key-values to hasura-acceptable values
 *
 * Currently that means that dates should never be an empty string, but in the future that can be extended
 * See https://github.com/marmelab/react-admin/pull/6199
 *
 */

type TypeAwareKeyValueReducer = (
  introspectionResults: IntrospectionResult,
  resource: IntrospectedResource,
  params: any
) => (acc: any, key: any) => any;

export const typeAwareKeyValueReducer: TypeAwareKeyValueReducer =
  (introspectionResults, resource, params) => (acc, key) => {
    const type = introspectionResults.types.find(
      (t) => t.name === resource.type.name
    );

    let value = params.data[key];
    if (type) {
      const field = (type as any)?.fields?.find(
        (t: IntrospectionField) => t.name === key
      );
      if (field?.type?.name === 'date' && params.data[key] === '') {
        value = null;
      }
    }
    return resource.type.fields.some((f) => f.name === key)
      ? {
          ...acc,
          [key]: value,
        }
      : acc;
  };
