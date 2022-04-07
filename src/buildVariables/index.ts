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
} from '../helpers/fetchActions';
import { buildGetListVariables } from './buildGetListVariables';
import { buildUpdateVariables } from './buildUpdateVariables';
import { buildCreateVariables } from './buildCreateVariables';
import { makeNestedTarget } from './makeNestedTarget';
import { FetchType, IntrospectedResource, IntrospectionResult } from '../types';

export type BuildVariables = (
  introspectionResults: IntrospectionResult
) => (
  resource: IntrospectedResource,
  aorFetchType: FetchType,
  params: any,
  queryType: any
) => any;

export const buildVariables: BuildVariables =
  (introspectionResults) => (resource, aorFetchType, params, queryType) => {
    switch (aorFetchType) {
      case GET_LIST:
        return buildGetListVariables(introspectionResults)(
          resource,
          aorFetchType,
          params
        );
      case GET_MANY_REFERENCE: {
        var built = buildGetListVariables(introspectionResults)(
          resource,
          aorFetchType,
          params
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
