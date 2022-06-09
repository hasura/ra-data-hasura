import {
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

export const AddressList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="address_line_one" />
      <TextField source="address_line_two" />
      <TextField source="city" />
      <DateField source="created_at" />
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="state" />
      <DateField source="updated_at" />
      <ReferenceField source="user_id" reference="user">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="zipcode" />
    </Datagrid>
  </List>
);

export const AddressEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="address_line_one" />
      <TextInput source="address_line_two" />
      <TextInput source="city" />
      <DateInput source="created_at" />
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="state" />
      <DateInput source="updated_at" />
      <ReferenceInput source="user_id" reference="user">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="zipcode" />
    </SimpleForm>
  </Edit>
);
