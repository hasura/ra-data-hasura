import * as gqlTypes from 'graphql-ast-types-browser';
import { IntrospectionField } from 'graphql';
import {
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  DELETE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE_MANY,
} from '../helpers/fetchActions';
import { buildFields, BuildFields } from './buildFields';
import {
  buildArgs,
  buildApolloArgs,
  buildMetaArgs,
  BuildArgs,
  BuildMetaArgs,
  BuildApolloArgs,
} from './buildArgs';
import { FetchType, IntrospectionResult } from '../types';

export type BuildGqlQuery = (
  introspectionResults: IntrospectionResult,
  buildFields: BuildFields,
  buildMetaArgs: BuildMetaArgs,
  buildArgs: BuildArgs,
  buildApolloArgs: BuildApolloArgs,
  aggregateFieldName: (resourceName: string) => string
) => (
  resource: any,
  aorFetchType: FetchType,
  queryType: IntrospectionField,
  variables: any
) => any;

export type BuildGqlQueryFactory = (
  introspectionResults: IntrospectionResult
) => ReturnType<BuildGqlQuery>;

export const buildGqlQuery: BuildGqlQuery =
  (
    _,
    buildFields,
    buildMetaArgs,
    buildArgs,
    buildApolloArgs,
    aggregateFieldName
  ) =>
  (resource, aorFetchType, queryType, variables) => {
    const { sortField, sortOrder, ...metaVariables } = variables;
    const apolloArgs = buildApolloArgs(queryType, variables);
    const args = buildArgs(queryType, variables);
    const metaArgs = buildMetaArgs(queryType, metaVariables, aorFetchType);
    const fields = buildFields(resource.type, aorFetchType);
    if (
      aorFetchType === GET_LIST ||
      aorFetchType === GET_MANY ||
      aorFetchType === GET_MANY_REFERENCE
    ) {
      return gqlTypes.document([
        gqlTypes.operationDefinition(
          'query',
          gqlTypes.selectionSet([
            gqlTypes.field(
              gqlTypes.name(queryType.name),
              gqlTypes.name('items'),
              args,
              null,
              gqlTypes.selectionSet(fields)
            ),
            gqlTypes.field(
              gqlTypes.name(aggregateFieldName(queryType.name)),
              gqlTypes.name('total'),
              metaArgs,
              null,
              gqlTypes.selectionSet([
                gqlTypes.field(
                  gqlTypes.name('aggregate'),
                  null,
                  null,
                  null,
                  gqlTypes.selectionSet([
                    gqlTypes.field(gqlTypes.name('count')),
                  ])
                ),
              ])
            ),
          ]),
          gqlTypes.name(queryType.name),
          apolloArgs
        ),
      ]);
    }

    if (
      aorFetchType === CREATE ||
      aorFetchType === UPDATE ||
      aorFetchType === UPDATE_MANY ||
      aorFetchType === DELETE ||
      aorFetchType === DELETE_MANY
    ) {
      return gqlTypes.document([
        gqlTypes.operationDefinition(
          'mutation',
          gqlTypes.selectionSet([
            gqlTypes.field(
              gqlTypes.name(queryType.name),
              gqlTypes.name('data'),
              args,
              null,
              gqlTypes.selectionSet([
                gqlTypes.field(
                  gqlTypes.name('returning'),
                  null,
                  null,
                  null,
                  gqlTypes.selectionSet(fields)
                ),
              ])
            ),
          ]),
          gqlTypes.name(queryType.name),
          apolloArgs
        ),
      ]);
    }

    return gqlTypes.document([
      gqlTypes.operationDefinition(
        'query',
        gqlTypes.selectionSet([
          gqlTypes.field(
            gqlTypes.name(queryType.name),
            gqlTypes.name('returning'),
            args,
            null,
            gqlTypes.selectionSet(fields)
          ),
        ]),
        gqlTypes.name(queryType.name),
        apolloArgs
      ),
    ]);
  };

const buildGqlQueryFactory: BuildGqlQueryFactory = (introspectionResults) =>
  buildGqlQuery(
    introspectionResults,
    buildFields,
    buildMetaArgs,
    buildArgs,
    buildApolloArgs,
    (resourceName) => `${resourceName}_aggregate`
  );

export default buildGqlQueryFactory;
