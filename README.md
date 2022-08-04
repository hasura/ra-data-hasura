# ra-data-hasura

A GraphQL data provider for [react-admin v4](https://marmelab.com/react-admin) tailored to target [Hasura](https://hasura.io/) GraphQL endpoints. For React Admin v3 use v0.4.2 of this library.

- [ra-data-hasura](#ra-data-hasura)
  - [Benefits and Motivation](#benefits-and-motivation)
  - [Installation](#installation)
  - [Usage](#usage)
  - [How It Works](#how-it-works)
  - [Options](#options)
    - [Customize the Apollo client](#customize-the-apollo-client)
    - [Adding Authentication Headers](#adding-authentication-headers)
    - [Customize the introspection](#customize-the-introspection)
    - [Customize the Data Return](#customize-the-data-return)
  - [Customizing queries](#customizing-queries)
    - [Example: extending a query to include related entities](#example-extending-a-query-to-include-related-entities)
    - [Example: write a completely custom query](#example-write-a-completely-custom-query)
  - [Special Filter Feature](#special-filter-feature)
    - [Nested filtering](#nested-filtering)
    - [Jsonb filtering](#jsonb-filtering)
  - [Sorting lists by multiple columns](#sorting-lists-by-multiple-columns)
  - [Contributing](#contributing)
  - [Credits](#credits)

Example applications demonstrating usage:

- [react-admin-low-code](https://github.com/cpursley/react-admin-low-code) (basic usage)
- [react-admin-hasura-queries](https://github.com/cpv123/react-admin-hasura-queries) (usage with custom queries)

## Benefits and Motivation

This utility is built on top of [ra-data-graphql](https://github.com/vladimiregorov/react-admin/blob/master/packages/ra-data-graphql/README.md) and is a custom data provider for the current Hasura GraphQL API format.

The existing ra-data-graphql-simple provider, requires that your GraphQL endpoint implement a specific grammar for the objects and methods exposed, which is different with Hasura because the exposed objects and methods are generated differently.

This utility auto generates valid GraphQL queries based on the properties exposed by the Hasura API such as `object_bool_exp` and `object_set_input`.

## Installation

Install with:

```sh
npm install --save graphql ra-data-hasura
```

## Usage

The `ra-data-hasura` package exposes a single function with the following signature:

```js
buildHasuraProvider(
  options?: Object,
  buildGqlQueryOverrides?: Object,
  customBuildVariables?: Function,
  customGetResponseParser?: Function,
) => Function
```

See the [Options](#options) and [Customizing queries](#customizing-queries) sections below for more details on these arguments.

This function acts as a constructor for a `dataProvider` based on a Hasura GraphQL endpoint. When executed, this function calls the endpoint, running an [introspection](http://graphql.org/learn/introspection/) query to learn about the specific data models exposed by your Hasura endpoint. It uses the result of this query (the GraphQL schema) to automatically configure the `dataProvider` accordingly.

```jsx
// Initialize the dataProvider before rendering react-admin resources.
import React, { useState, useEffect } from 'react';
import buildHasuraProvider from 'ra-data-hasura';
import { Admin, Resource } from 'react-admin';

import { PostCreate, PostEdit, PostList } from './posts';

const App = () => {
  const [dataProvider, setDataProvider] = useState(null);

  useEffect(() => {
    const buildDataProvider = async () => {
      const dataProvider = await buildHasuraProvider({
        clientOptions: { uri: 'http://localhost:8080/v1/graphql' },
      });
      setDataProvider(() => dataProvider);
    };
    buildDataProvider();
  }, []);

  if (!dataProvider) return <p>Loading...</p>;

  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="Post"
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
      />
    </Admin>
  );
};

export default App;
```

## How It Works

The data provider converts React Admin queries into the form expected by Hasura's GraphQL API. For example, a React Admin `GET_LIST` request for a person resource with the parameters :

```json
{
  "pagination": { "page": 1, "perPage": 5 },
  "sort": { "field": "name", "order": "DESC" },
  "filter": {
    "ids": [101, 102]
  }
}
```

will generate the following GraphQL request for Hasura :

```
query person($limit: Int, $offset: Int, $order_by: [person_order_by!]!, $where: person_bool_exp) {
  items: person(limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
    id
    name
    address_id
  }
  total: person_aggregate(limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
    aggregate {
      count
    }
  }
}
```

With the following variables to be passed alongside the query:

```
{
  limit: 5,
  offset: 0,
  order_by: { name: 'desc' },
  where: {
    _and: [
      {
        id: {
          _in: [101, 102]
        }
      }
    ]
  }
}

```

React Admin sort and filter objects will be converted appropriately, for example sorting with dot notation:

```jsx
export const PostList = (props) => (
  <List {...props} sort={{ field: 'user.email', order: 'DESC' }}>
    ...
  </List>
);
```

will generate the following GraphQL query variables:

```js
{
  limit: 25,
  offset: 0,
  order_by: { user: { email: 'desc' } }
}
```

and

```jsx
export const AddressList = () => (
  <List
    sort={{ field: 'city', order: 'DESC' }}
    filter={{ distinct_on: 'city' }}
  >
    ...
  </List>
);
```

will generate the following GraphQL query variables:

```json
{
  // ...
  "order_by": {
    "city": "desc"
  },
  "distinct_on": "city"
}
```

Keep in mind that `distinct_on` must be used in conjunction with `order_by`, otherwise a `"distinct_on" columns must match initial "order_by" columns"` error will result. See more [here](https://hasura.io/docs/latest/queries/postgres/distinct-queries/#the-distinct_on-argument).

## Options

### Customize the Apollo client

You can either supply just the client options:

```js
buildGraphQLProvider({
  clientOptions: {
    uri: 'http://localhost:8080/v1/graphql',
    ...otherApolloOptions,
  },
});
```

or supply the client instance directly:

```js
buildGraphQLProvider({ client: myClient });
```

### Adding Authentication Headers

To send authentication headers, you'll need to supply the client instance directly with headers defined:

```js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const myClientWithAuth = new ApolloClient({
  uri: 'http://localhost:8080/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret': 'hasuraAdminSecret',
    // 'Authorization': `Bearer xxxx`,
  },
});

buildHasuraProvider({ client: myClientWithAuth });
```

<details style="margin-bottom: 20px">

<summary style="margin-bottom: 10px">Adding headers using just client options</summary>

You can also add headers using only client options rather than the client itself:

```js
import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    'x-hasura-admin-secret': 'hasuraAdminSecret',
    // 'Authorization': `Bearer xxxx`,
  },
}));

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/v1/graphql',
});

const clientOptionsWithAuth = {
  link: authLink.concat(httpLink),
};

buildHasuraProvider({ client: clientOptionsWithAuth });
```

</details>

### Customize the introspection

These are the default options for introspection:

```js
const introspectionOptions = {
  include: [], // Either an array of types to include or a function which will be called for every type discovered through introspection
  exclude: [], // Either an array of types to exclude or a function which will be called for every type discovered through introspection
};

// Including types
const introspectionOptions = {
  include: ['Post', 'Comment'],
};

// Excluding types
const introspectionOptions = {
  exclude: ['CommandItem'],
};

// Including types with a function
const introspectionOptions = {
  include: (type) => ['Post', 'Comment'].includes(type.name),
};

// Including types with a function
const introspectionOptions = {
  exclude: (type) => !['Post', 'Comment'].includes(type.name),
};
```

**Note**: `exclude` and `include` are mutually exclusives and `include` will take precendance.

**Note**: When using functions, the `type` argument will be a type returned by the introspection query. Refer to the [introspection](http://graphql.org/learn/introspection/) documentation for more information.

Pass the introspection options to the `buildApolloProvider` function:

```js
buildApolloProvider({ introspection: introspectionOptions });
```

### Customize the Data Return

Once the data is returned back from the provider, you can customize it by implementing the `DataProvider` interface. [An example is changing the ID key](https://marmelab.com/react-admin/FAQ.html#can-i-have-custom-identifiersprimary-keys-for-my-resources).

```typescript
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
    const modifiedProvider: DataProvider = {
      getList: async (resource, params) => {
        let { data, ...metadata } = await dataProviderHasura.getList(
          resource,
          params
        );

        if (resource === 'example_resource_name') {
          data = data.map(
            (val): Record => ({
              ...val,
              id: val.region_id,
            })
          );
        }

        return {
          data: data as any[],
          ...metadata,
        };
      },
      getOne: (resource, params) => dataProviderHasura.getOne(resource, params),
      getMany: (resource, params) =>
        dataProviderHasura.getMany(resource, params),
      getManyReference: (resource, params) =>
        dataProviderHasura.getManyReference(resource, params),
      update: (resource, params) => dataProviderHasura.update(resource, params),
      updateMany: (resource, params) =>
        dataProviderHasura.updateMany(resource, params),
      create: (resource, params) => dataProviderHasura.create(resource, params),
      delete: (resource, params) => dataProviderHasura.delete(resource, params),
      deleteMany: (resource, params) =>
        dataProviderHasura.deleteMany(resource, params),
    };
    setDataProvider(() => modifiedProvider);
  };
  buildDataProvider();
}, []);
```

## Customizing queries

Queries built by this data provider are made up of 3 parts:

1. The set of fields requested
2. The variables defining the query constraints like `where, order_by, limit, offset`
3. The response format e.g. `{ data: {...}, total: 100 }`

Each of these can be customized - functions overriding numbers 2 and 3 can be passed to directly to `buildDataProvider` as shown in [Usage](#usage), whilst number 1 can be customized in parts using the `buildGqlQueryOverrides` object argument:

```js
{
  buildFields?: Function,
  buildMetaArgs?: Function,
  buildArgs?: Function,
  buildApolloArgs?: Function,
}
```

A likely scenario is that you want to override only the `buildFields` part so that you can customize your GraphQL queries - requesting fewer fields, more fields, nested fields etc.

This can be easily done, and importantly can be done using `gql` template literal tags, as shown in the examples below. Take a look at this [demo application](https://github.com/cpv123/react-admin-hasura-queries) to see it in action.

### Example: extending a query to include related entities

By default, the data provider will generate queries that include all fields on a resource, but without any relationships to nested entities. If you would like to keep these base fields but extend the query to also include related entities, then you can write a custom `buildFields` like this:

```ts
import buildDataProvider, { buildFields } from 'ra-data-hasura';
import type { BuildFields } from 'ra-data-hasura';
import gql from 'graphql-tag';

/**
 * Extracts just the fields from a GraphQL AST.
 * @param {GraphQL AST} queryAst
 */
const extractFieldsFromQuery = (queryAst) => {
  return queryAst.definitions[0].selectionSet.selections;
};

// Define the additional fields that we want.
const EXTENDED_GET_ONE_USER = gql`
  {
    todos_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const customBuildFields: BuildFields = (type, fetchType) => {
  const resourceName = type.name;

  // First take the default fields (all, but no related or nested).
  const defaultFields = buildFields(type, fetchType);

  if (resourceName === 'users' && fetchType === 'GET_ONE') {
    const relatedEntities = extractFieldsFromQuery(EXTENDED_GET_ONE_USER);
    defaultFields.push(...relatedEntities);
  }

  // Extend other queries for other resources/fetchTypes here...

  return defaultFields;
};

buildDataProvider(options, { buildFields: customBuildFields });
```

### Example: write a completely custom query

If you want full control over the GraphQL query, then you can define the entire set of fields like this:

```ts
import gql from 'graphql-tag';
import buildDataProvider, { buildFields } from 'ra-data-hasura';
import type { BuildFields } from 'ra-data-hasura';

/**
 * Extracts just the fields from a GraphQL AST.
 * @param {GraphQL AST} queryAst
 */
const extractFieldsFromQuery = (queryAst) => {
  return queryAst.definitions[0].selectionSet.selections;
};

const GET_ONE_USER = gql`
  {
    id
    name
    todos(
      where: { is_completed: { _eq: false } }
      order_by: { created_at: asc }
    ) {
      title
    }
    todos_aggregate {
      aggregate {
        count
      }
    }
  }
`;

const customBuildFields: BuildFields = (type, fetchType) => {
  const resourceName = type.name;

  if (resourceName === 'users' && fetchType === 'GET_ONE') {
    return extractFieldsFromQuery(GET_ONE_USER);
  }

  // No custom query defined, so use the default query fields (all, but no related/nested).
  return buildFields(type, fetchType);
};

buildDataProvider(options, { buildFields: customBuildFields });
```

Note that when using this approach in particular, it is possible that you will come across [this issue](https://github.com/cpv123/react-admin-hasura-queries#troubleshooting).

## Special Filter Feature

This adapter allows filtering several columns at a time with using specific comparators, e.g. `ilike`, `like`, `eq`, etc.

```tsx
<Filter {...props}>
  <TextInput
    label="Search"
    source="email,first_name@_eq,last_name@_like"
    alwaysOn
  />
</Filter>
```

It will generate the following filter payload

```json
{
  "variables": {
    "where": {
      "_and": [],
      "_or": [
        {
          "email": {
            "_ilike": "%edu%"
          }
        },
        {
          "first_name": {
            "_eq": "edu"
          }
        },
        {
          "last_name": {
            "_like": "%edu%"
          }
        }
      ]
    },
    "limit": 10,
    "offset": 0,
    "order_by": {
      "id": "asc"
    }
  }
}
```

The adapter assigns default comparator depends on the data type if it is not provided.
For string data types, it assumes as text search and uses `ilike` otherwise it uses `eq`.
For string data types that uses `like` or `ilike` it automatically transform the filter `value` as `%value%`.

### Nested filtering

Nested filtering is supported using # as a field separator.

```tsx
<TextInput
  label="Search by indication, drug, sponsor, nctid"
  source="indication#name@_ilike,drug#preferred_name@_ilike,sponsor#name@_ilike,trial#nctid@_ilike"
  alwaysOn
/>
```

Will produce the following payload:

```json
{
  "where": {
    "_and": [],
    "_or": [
      {
        "indication": {
          "name": {
            "_ilike": "%TEXT%"
          }
        }
      },
      {
        "drug": {
          "name": {
            "_ilike": "%TEXT%"
          }
        }
      },
      {
        "sponsor": {
          "name": {
            "_ilike": "%TEXT%"
          }
        }
      }
    ]
  },
  "limit": 10,
  "offset": 0,
  "order_by": {
    "id": "asc"
  }
}
```

## Jsonb filtering

```jsx
<TextField label="Theme Color" source="users#preferences@_contains@ux#theme" />
```

Will produce payload:

```json
{
  "where": {
    "_and": [
      {
        "users": {
          "preferences": {
            "_contains": {
              "ux": {
                "theme": "%TEXT"
              }
            }
          }
        }
      }
    ]
  },
  "limit": 10,
  "offset": 0,
  "order_by": {
    "id": "asc"
  }
}
```

Fetch data matching a jsonb `_contains` operation

```jsx
<FunctionField render={(rec: {processor = "apple" | "google" | "stripe", ...})
  <ReferenceManyField
    reference="account_plans"
    target="payments#details@_contains@processor#${rec.processor}_id"
    source="payment_processor"
  >
    <Datagrid>
    ...
    </Datagrid>
  </ReferenceManyField>
} />
```

Will produce payload:

```json
{
  "where": {
    "_and": [
      {
        "payments": {
          "details": {
            "_contains": {
              "processor": {
                "%{rec.processor}_id": "%{rec.id}"
              }
            }
          }
        }
      }
    ]
  }
}
```

## Sorting lists by multiple columns

Hasura support [sorting by multiple fields](https://hasura.io/docs/latest/graphql/core/databases/postgres/queries/sorting.html#sorting-by-multiple-fields) but React Admin itself doesn't allow the `List` component to receive an array as the `sort` prop. So to achieve sorting by multiple fields, separate the field and order values using a comma.

For example, a list like

```jsx
const TodoList = (props) => (
  <List sort={{ field: 'title,is_completed', order: 'asc,desc' }} {...props}>
    <Datagrid rowClick="edit">...</Datagrid>
  </List>
);
```

will generate a query with an `order_by` variable like

```
order_by: [{ title: "asc" }, { is_completed: "desc" }]
```

Fields may contain dots to specify sorting by nested object properties similarly to React Admin `source` property.

## Contributing

To modify, extend and test this package locally,

```
$ cd ra-data-hasura
$ npm link
```

Now use this local package in your react app for testing

```
$ cd my-react-app
$ npm link ra-data-hasura
```

Build the library by running `npm run build` and it will generate the transpiled version of the library under `lib` folder.

## Credits

We would like to thank [Steams](https://github.com/Steams) and all the contributors to this library for porting this adapter to support GraphQL spec, since all the releases till v0.0.8 were based off the REST API spec.
