import merge from 'lodash/merge';
import buildDataProvider from 'ra-data-graphql';
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

import defaultBuildVariables from './buildVariables';
import defaultGetResponseParser from './getResponseParser';
import {
  buildGqlQuery,
  buildFields,
  buildMetaArgs,
  buildArgs,
  buildApolloArgs,
} from './buildGqlQuery';
import { buildQueryFactory } from './buildQuery';

export {
  buildFields,
  buildMetaArgs,
  buildArgs,
  buildApolloArgs,
  defaultBuildVariables,
  defaultGetResponseParser,
};
import buildQuery from './buildQuery';
import buildVariables from './buildVariables'

export { buildQuery, buildGqlQuery, buildVariables };

const defaultOptions = {
  introspection: {
    operationNames: {
      [GET_LIST]: (resource) => `${resource.name}`,
      [GET_ONE]: (resource) => `${resource.name}`,
      [GET_MANY]: (resource) => `${resource.name}`,
      [GET_MANY_REFERENCE]: (resource) => `${resource.name}`,
      [CREATE]: (resource) => `insert_${resource.name}`,
      [UPDATE]: (resource) => `update_${resource.name}`,
      [UPDATE_MANY]: (resource) => `update_${resource.name}`,
      [DELETE]: (resource) => `delete_${resource.name}`,
      [DELETE_MANY]: (resource) => `delete_${resource.name}`,
    },
  },
};

const buildGqlQueryDefaults = {
  buildFields,
  buildMetaArgs,
  buildArgs,
  buildApolloArgs,
};

const buildCustomDataProvider = (
  options,
  buildGqlQueryOverrides = {},
  customBuildVariables = defaultBuildVariables,
  customGetResponseParser = defaultGetResponseParser
) => {
  const buildGqlQueryOptions = {
    ...buildGqlQueryDefaults,
    ...buildGqlQueryOverrides,
  };

  const customBuildGqlQuery = (introspectionResults) =>
    buildGqlQuery(
      introspectionResults,
      buildGqlQueryOptions.buildFields,
      buildGqlQueryOptions.buildMetaArgs,
      buildGqlQueryOptions.buildArgs,
      buildGqlQueryOptions.buildApolloArgs
    );

  const buildQuery = buildQueryFactory(
    customBuildVariables,
    customBuildGqlQuery,
    customGetResponseParser
  );

  return buildDataProvider(
    merge({}, defaultOptions, { buildQuery }, options)
  ).then((dataProvider) => {
    return (fetchType, resource, params) => {
      return dataProvider(fetchType, resource, params);
    };
  });
};

export default buildCustomDataProvider;
