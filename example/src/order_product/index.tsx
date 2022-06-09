import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from 'react-admin';

export const OrderProductList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <DateField source="created_at" />
      <ReferenceField source="order_id" reference="order">
        <TextField source="id" />
      </ReferenceField>
      <ReferenceField source="product_id" reference="product">
        <TextField source="name" />
      </ReferenceField>
      <NumberField source="quantity" />
      <DateField source="updated_at" />
    </Datagrid>
  </List>
);
