import { typeAwareKeyValueReducer } from './typeAwareKeyValueReducer';
import { FetchType, IntrospectedResource, IntrospectionResult } from '../types';

type BuildCreateVariables = (
  introspectionResults: IntrospectionResult
) => (
  resource: IntrospectedResource,
  aorFetchType: FetchType,
  params: any,
  queryType: any
) => any;

export const buildCreateVariables: BuildCreateVariables =
  (introspectionResults) => (resource, _, params, __) => {
    const reducer = typeAwareKeyValueReducer(
      introspectionResults,
      resource,
      params
    );
    return Object.keys(params.data).reduce(reducer, {});
  };
