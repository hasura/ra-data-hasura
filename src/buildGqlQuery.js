import {
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  DELETE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE_MANY,
} from './fetchActions';

import { TypeKind } from 'graphql';
import * as gqlTypes from 'graphql-ast-types-browser';

import getFinalType from './getFinalType';
import isList from './isList';
import isRequired from './isRequired';

export const buildFragments = (introspectionResults) => (possibleTypes) =>
  possibleTypes.reduce((acc, possibleType) => {
    const type = getFinalType(possibleType);

    const linkedType = introspectionResults.types.find(
      (t) => t.name === type.name
    );

    return [
      ...acc,
      gqlTypes.inlineFragment(
        gqlTypes.selectionSet(buildFields(linkedType)),
        gqlTypes.namedType(gqlTypes.name(type.name))
      ),
    ];
  }, []);

export const buildFields = (type) =>
  type.fields.reduce((acc, field) => {
    const type = getFinalType(field.type);


    if (type.kind !== TypeKind.OBJECT && type.kind !== TypeKind.INTERFACE) {
      return [...acc, gqlTypes.field(gqlTypes.name(field.name))];
    }

    return acc;
  }, []);

export const getArgType = (arg) => {
  const type = getFinalType(arg.type);
  const required = isRequired(arg.type);
  const list = isList(arg.type);

  if (required) {
    if (list) {
      return gqlTypes.nonNullType(
        gqlTypes.listType(
          gqlTypes.nonNullType(gqlTypes.namedType(gqlTypes.name(type.name)))
        )
      );
    }

    return gqlTypes.nonNullType(gqlTypes.namedType(gqlTypes.name(type.name)));
  }

  if (list) {
    return gqlTypes.listType(gqlTypes.namedType(gqlTypes.name(type.name)));
  }

  return gqlTypes.namedType(gqlTypes.name(type.name));
};

export const buildArgs = (query, variables) => {
  if (query.args.length === 0) {
    return [];
  }

  const validVariables = Object.keys(variables).filter(
    (k) => typeof variables[k] !== 'undefined'
  );

  let args = query.args
    .filter((a) => validVariables.includes(a.name))
    .reduce(
      (acc, arg) => [
        ...acc,
        gqlTypes.argument(
          gqlTypes.name(arg.name),
          gqlTypes.variable(gqlTypes.name(arg.name))
        ),
      ],
      []
    );

  return args;
};

export const buildMetaArgs = (query, variables, aorFetchType) => {
  if (query.args.length === 0) {
    return [];
  }

  const validVariables = Object.keys(variables).filter((k) => {
    if (
      aorFetchType === GET_LIST ||
      aorFetchType === GET_MANY ||
      aorFetchType === GET_MANY_REFERENCE
    ) {
      return (
        typeof variables[k] !== 'undefined' && k !== 'limit' && k !== 'offset'
      );
    }

    return typeof variables[k] !== 'undefined';
  });

  let args = query.args
    .filter((a) => validVariables.includes(a.name))
    .reduce(
      (acc, arg) => [
        ...acc,
        gqlTypes.argument(
          gqlTypes.name(arg.name),
          gqlTypes.variable(gqlTypes.name(arg.name))
        ),
      ],
      []
    );

  return args;
};

export const buildApolloArgs = (query, variables) => {
  if (query.args.length === 0) {
    return [];
  }

  const validVariables = Object.keys(variables).filter(
    (k) => typeof variables[k] !== 'undefined'
  );

  let args = query.args
    .filter((a) => validVariables.includes(a.name))
    .reduce((acc, arg) => {
      return [
        ...acc,
        gqlTypes.variableDefinition(
          gqlTypes.variable(gqlTypes.name(arg.name)),
          getArgType(arg)
        ),
      ];
    }, []);

  return args;
};

export const buildGqlQuery = (
  introspectionResults,
  buildFields,
  buildMetaArgs,
  buildArgs,
  buildApolloArgs
) => (resource, aorFetchType, queryType, variables) => {
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
            gqlTypes.name(`${queryType.name}_aggregate`),
            gqlTypes.name('total'),
            metaArgs,
            null,
            gqlTypes.selectionSet([
              gqlTypes.field(
                gqlTypes.name('aggregate'),
                null,
                null,
                null,
                gqlTypes.selectionSet([gqlTypes.field(gqlTypes.name('count'))])
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

export default (introspectionResults) =>
  buildGqlQuery(
    introspectionResults,
    buildFields,
    buildMetaArgs,
    buildArgs,
    buildApolloArgs
  );
