import { ApolloCurrentQueryResult } from 'apollo-client';
import {
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  GET_ONE,
  CREATE,
  UPDATE,
  DELETE,
  UPDATE_MANY,
  DELETE_MANY,
} from '../helpers/fetchActions';
import { IntrospectionResult, IntrospectedResource } from '../types';
import { sanitizeResource } from './sanitizeResource';

const getResponseParser = (_: IntrospectionResult) => (
  aorFetchType: string,
  _?: IntrospectedResource
) => (res: ApolloCurrentQueryResult<any>) => {
  const response = res.data;

  switch (aorFetchType) {
    case GET_MANY_REFERENCE:
    case GET_LIST:
      return {
        data: response.items.map(sanitizeResource),
        total: response.total.aggregate.count,
      };

    case GET_MANY:
      return { data: response.items.map(sanitizeResource) };

    case GET_ONE:
      return { data: sanitizeResource(response.returning[0]) };

    case CREATE:
    case UPDATE:
    case DELETE:
      return { data: sanitizeResource(response.data.returning[0]) };

    case UPDATE_MANY:
    case DELETE_MANY:
      return { data: response.data.returning.map((x: { id: any }) => x.id) };

    default:
      throw Error(`Expected a proper fetchType, got: ${aorFetchType}`);
  }
};

export default getResponseParser;
