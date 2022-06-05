import * as React from 'react';
import { Admin, Resource, DataProvider } from 'react-admin';
import buildHasuraProvider from 'ra-data-hasura';
import { ProductEdit, ProductList } from './product';
import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { OrderEdit, OrderList } from './order';
import { OrderProductList } from './order_product';
import { UserEdit, UserList } from './user';
import { AddressEdit, AddressList } from './address';

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization:
        // To generate your own JWT see Hasura Super App https://github.com/hasura/hasura-ecommerce
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOlsic2l0ZS1hZG1pbiIsInVzZXIiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoic2l0ZS1hZG1pbiIsIlgtSGFzdXJhLVNpdGUtQWRtaW4tSWQiOiIxIn0sImlhdCI6MTY1MTc4MTg1NH0.DsyJSVZYt7Ah8PIWFvnYbAvnpSDdMbhAkmjuLRE8Gas',
    },
  };
});

const App = () => {
  const [dataProvider, setDataProvider] = React.useState<DataProvider | null>(
    null
  );

  React.useEffect(() => {
    const buildDataProvider = async () => {
      const dataProviderHasura = await buildHasuraProvider({
        clientOptions: {
          link: authLink.concat(httpLink) as any,
        },
      });
      setDataProvider(() => dataProviderHasura);
    };
    buildDataProvider();
  }, []);

  if (!dataProvider) return <p>Loading...</p>;

  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="order" list={OrderList} edit={OrderEdit} />
      <Resource name="address" list={AddressList} edit={AddressEdit} />
      <Resource name="order_product" list={OrderProductList} />
      <Resource name="product" list={ProductList} edit={ProductEdit} />
      <Resource name="user" list={UserList} edit={UserEdit} />
    </Admin>
  );
};

export default App;
