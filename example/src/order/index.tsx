import {
  BooleanField,
  BooleanInput,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  List,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin';

export const OrderList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <ReferenceField source="billing_address_id" reference="address">
        <TextField source="address_line_one" />
      </ReferenceField>
      <DateField source="created_at" />
      <BooleanField source="is_shipped" />
      <ReferenceField source="shipping_address_id" reference="address">
        <TextField source="address_line_one" />
      </ReferenceField>
      <TextField source="status" />
      <DateField source="updated_at" />
      <ReferenceField source="user_id" reference="user">
        <TextField source="name" />
      </ReferenceField>
    </Datagrid>
  </List>
);

export const OrderEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="billing_address_id" reference="address">
        <SelectInput optionText="address_line_one" />
      </ReferenceInput>
      <DateInput source="created_at" />
      <TextInput source="id" />
      <BooleanInput source="is_shipped" />
      <ReferenceInput source="shipping_address_id" reference="address">
        <SelectInput optionText="address_line_one" />
      </ReferenceInput>
      <TextInput source="status" />
      <DateInput source="updated_at" />
      <ReferenceInput source="user_id" reference="user">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);
