import * as React from 'react';
import { Admin, Resource, DataProvider } from 'react-admin';
import buildHasuraProvider from 'ra-data-hasura';
import { ProductList } from './product';

const App = () => {
  const [dataProvider, setDataProvider] = React.useState<DataProvider | null>(
    null
  );

  React.useEffect(() => {
    const buildDataProvider = async () => {
      const dataProviderHasura = await buildHasuraProvider({
        clientOptions: {
          uri: 'http://localhost:8080/v1/graphql',
        },
      });
      setDataProvider(() => dataProviderHasura);
    };
    buildDataProvider();
  }, []);

  if (!dataProvider) return <p>Loading...</p>;

  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="product" list={ProductList} />
    </Admin>
  );
};

export default App;
