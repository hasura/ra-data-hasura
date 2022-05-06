import {
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditProps,
  EmailField,
  List,
  ListProps,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin';

export const UserList = (props: ListProps) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <DateField source="created_at" />
      <EmailField source="email" />
      <TextField source="name" />
      <TextField source="password" />
      <DateField source="updated_at" />
    </Datagrid>
  </List>
);

export const UserEdit = (props: EditProps) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" />
      <DateInput source="created_at" />
      <TextInput source="email" />
      <TextInput source="name" />
      <TextInput source="password" />
      <DateInput source="updated_at" />
    </SimpleForm>
  </Edit>
);
