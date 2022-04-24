import * as gqlTypes from 'graphql-ast-types-browser';
import getFinalType from './getFinalType';
import isRequired from './isRequired';
import isList from './isList';

const getArgType = (arg: any) => {
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

export default getArgType;
