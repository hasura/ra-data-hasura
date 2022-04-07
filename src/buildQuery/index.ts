import { buildVariables } from '../buildVariables';
import buildGqlQuery, { BuildGqlQueryFactory } from '../buildGqlQuery';
import { getResponseParser, GetResponseParser } from '../getResponseParser';
import type { FetchType, IntrospectionResult } from '../types';

export type BuildQuery = (introspectionResults: IntrospectionResult) => (
  aorFetchType: FetchType,
  resourceName: string,
  params: any
) => {
  query: any;
  variables: any;
  parseResponse: ({ data }: any) => { data: any; total?: number };
};

export type BuildQueryFactory = (
  buildVariablesImpl: any,
  buildGqlQueryImpl: BuildGqlQueryFactory,
  getResponseParserImpl: GetResponseParser
) => BuildQuery;

export const buildQueryFactory: BuildQueryFactory =
  (buildVariablesImpl, buildGqlQueryImpl, getResponseParserImpl) =>
  (introspectionResults) => {
    const knownResources = introspectionResults.resources.map(
      (r) => r.type.name
    );

    return (aorFetchType, resourceName, params) => {
      const resource = introspectionResults.resources.find(
        (r) => r.type.name === resourceName
      );

      if (!resource) {
        if (knownResources.length) {
          throw new Error(
            `Unknown resource ${resourceName}. Make sure it has been declared on your server side schema. Known resources are ${knownResources.join(
              ', '
            )}`
          );
        } else {
          throw new Error(
            `Unknown resource ${resourceName}. No resources were found. Make sure it has been declared on your server side schema and check if your Authorization header is properly set up.`
          );
        }
      }

      const queryType = resource[aorFetchType];

      if (!queryType) {
        throw new Error(
          `No query or mutation matching fetch type ${aorFetchType} could be found for resource ${resource.type.name}`
        );
      }

      const variables = buildVariablesImpl(introspectionResults)(
        resource,
        aorFetchType,
        params,
        queryType
      );
      const query = buildGqlQueryImpl(introspectionResults)(
        resource,
        aorFetchType,
        queryType,
        variables
      );
      const parseResponse = getResponseParserImpl(introspectionResults)(
        aorFetchType,
        resource
      );

      return {
        query,
        variables,
        parseResponse,
      };
    };
  };

export default buildQueryFactory(
  buildVariables,
  buildGqlQuery,
  getResponseParser
);
