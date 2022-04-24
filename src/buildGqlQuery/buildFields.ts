import { TypeKind, IntrospectionObjectType, FieldNode } from 'graphql';
import * as gqlTypes from 'graphql-ast-types-browser';
import getFinalType from '../helpers/getFinalType';
import { FetchType } from '../types';

export type BuildFields = (
  type: IntrospectionObjectType,
  aorFetchType?: FetchType
) => FieldNode[];

export const buildFields: BuildFields = (type) =>
  type.fields.reduce((acc, field) => {
    const type = getFinalType(field.type);

    if (type.kind !== TypeKind.OBJECT && type.kind !== TypeKind.INTERFACE) {
      return [...acc, gqlTypes.field(gqlTypes.name(field.name))];
    }

    return acc;
  }, [] as FieldNode[]);
