import {
  IntrospectionObjectType,
  IntrospectionSchema,
  IntrospectionType,
  IntrospectionField,
} from 'graphql';

export enum FetchType {
  GET_LIST = 'GET_LIST',
  GET_ONE = 'GET_ONE',
  GET_MANY = 'GET_MANY',
  GET_MANY_REFERENCE = 'GET_MANY_REFERENCE',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  UPDATE_MANY = 'UPDATE_MANY',
  DELETE = 'DELETE',
  DELETE_MANY = 'DELETE_MANY',
}

export type IntrospectedResource = {
  type: IntrospectionObjectType;
} & {
  [fetchType in FetchType]: IntrospectionField;
};

export type IntrospectionResult = {
  types: IntrospectionType[];
  queries: IntrospectionObjectType[];
  resources: IntrospectedResource[];
  schema: IntrospectionSchema;
};
