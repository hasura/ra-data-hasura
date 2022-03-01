import {
  IntrospectionObjectType,
  IntrospectionSchema,
  IntrospectionType,
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

export type IntrospectionOptions = {
  schema?: IntrospectionSchema;
  operationNames: {
    [key: string]: (type: IntrospectionType) => string;
  };
  exclude?: string[] | ((type: IntrospectionType) => boolean);
  include?: string[] | ((type: IntrospectionType) => boolean);
};

export type IntrospectedResource = {
  type: IntrospectionObjectType;
};
export type IntrospectionResult = {
  types: IntrospectionType[];
  queries: IntrospectionObjectType[];
  resources: IntrospectedResource[];
  schema: IntrospectionSchema;
};

export type GetFieldName = (name: string) => string;
