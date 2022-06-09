import {
  BooleanInput,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  List,
  NumberField,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin';

export const ProductList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="brand" />
      <TextField source="category_display_name" />
      <DateField source="created_at" />
      <TextField source="description" />
      <TextField source="image_urls" />
      <NumberField source="price" />
      <DateField source="updated_at" />
    </Datagrid>
  </List>
);

export const ProductEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <ReferenceInput source="billing_address_id" reference="address">
        <SelectInput optionText="address_line_one" />
      </ReferenceInput>
      <DateInput source="created_at" />
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
