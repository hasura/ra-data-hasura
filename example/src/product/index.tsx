import {
  Datagrid,
  DateField,
  List,
  ListProps,
  NumberField,
  TextField,
} from 'react-admin';

export const ProductList = (props: ListProps) => (
  <List {...props}>
    <Datagrid rowClick="edit">
      <TextField source="brand" />
      <TextField source="category_display_name" />
      <DateField source="created_at" />
      <TextField source="description" />
      <TextField source="id" />
      <TextField source="image_urls" />
      <TextField source="name" />
      <NumberField source="price" />
      <DateField source="updated_at" />
    </Datagrid>
  </List>
);
