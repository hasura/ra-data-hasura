import * as gqlTypes from 'graphql-ast-types-browser';
import {
  IntrospectionField,
  ArgumentNode,
  VariableDefinitionNode,
} from 'graphql';
import {
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
} from '../helpers/fetchActions';
import getArgType from '../helpers/getArgType';
import { FetchType } from '../types';

export type BuildArgs = (
  query: IntrospectionField,
  variables: any
) => ArgumentNode[];

export type BuildMetaArgs = (
  query: IntrospectionField,
  variables: any,
  aorFetchType: FetchType
) => ArgumentNode[];

export type BuildApolloArgs = (
  query: IntrospectionField,
  variables: any
) => VariableDefinitionNode[];

export const buildArgs: BuildArgs = (query, variables) => {
  if (query.args.length === 0) {
    return [];
  }

  const validVariables = Object.keys(variables).filter(
    (k) => typeof variables[k] !== 'undefined'
  );

  return query.args
    .filter((a) => validVariables.includes(a.name))
    .reduce(
      (acc, arg) => [
        ...acc,
        gqlTypes.argument(
          gqlTypes.name(arg.name),
          gqlTypes.variable(gqlTypes.name(arg.name))
        ),
      ],
      [] as ArgumentNode[]
    );
};

export const buildMetaArgs: BuildMetaArgs = (
  query,
  variables,
  aorFetchType
) => {
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

  return query.args
    .filter((a) => validVariables.includes(a.name))
    .reduce(
      (acc, arg) => [
        ...acc,
        gqlTypes.argument(
          gqlTypes.name(arg.name),
          gqlTypes.variable(gqlTypes.name(arg.name))
        ),
      ],
      [] as ArgumentNode[]
    );
};

export const buildApolloArgs: BuildApolloArgs = (query, variables) => {
  if (query.args.length === 0) {
    return [];
  }

  const validVariables = Object.keys(variables).filter(
    (k) => typeof variables[k] !== 'undefined'
  );

  return query.args
    .filter((a) => validVariables.includes(a.name))
    .reduce((acc, arg) => {
      return [
        ...acc,
        gqlTypes.variableDefinition(
          gqlTypes.variable(gqlTypes.name(arg.name)),
          getArgType(arg)
        ),
      ];
    }, [] as VariableDefinitionNode[]);
};
