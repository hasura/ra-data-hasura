import isEqual from 'lodash/isEqual';
import { IntrospectionInputObjectType } from 'graphql';
import { FetchType, IntrospectedResource, IntrospectionResult } from '../types';
import { typeAwareKeyValueReducer } from './typeAwareKeyValueReducer';

type BuildUpdateVariables = (
  introspectionResults: IntrospectionResult
) => (
  resource: IntrospectedResource,
  aorFetchType: FetchType,
  params: any,
  queryType: any
) => any;

export const buildUpdateVariables: BuildUpdateVariables =
  (introspectionResults) => (resource, _, params, __) => {
    const reducer = typeAwareKeyValueReducer(
      introspectionResults,
      resource,
      params
    );
    let permitted_fields: any = null;
    const resource_name = resource.type.name;
    if (resource_name) {
      let inputType = introspectionResults.types.find(
        (obj) => obj.name === `${resource_name}_set_input`
      );
      if (inputType) {
        let inputTypeFields = (inputType as IntrospectionInputObjectType)
          .inputFields;
        if (inputTypeFields) {
          permitted_fields = inputTypeFields.map((obj) => obj.name);
        }
      }
    }
    return Object.keys(params.data).reduce((acc, key) => {
      // If hasura permissions do not allow a field to be updated like (id),
      // we are not allowed to put it inside the variables
      // RA passes the whole previous Object here
      // https://github.com/marmelab/react-admin/issues/2414#issuecomment-428945402

      // Fetch permitted fields from *_set_input INPUT_OBJECT and filter out any key
      // not present inside it
      if (permitted_fields && !permitted_fields.includes(key)) return acc;

      if (
        params.previousData &&
        isEqual(params.data[key], params.previousData[key])
      ) {
        return acc;
      }
      return reducer(acc, key);
    }, {});
  };
