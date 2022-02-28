## 0.2.0 (June 30, 2021)

- Feature: Update only permitted fields.
- Feature: Add option for custom aggregate field names.
- Feature: Reference a nested object in a reference field.
- Bug Fix: Issue in sanitizing a null value in an array.
- Feature: Add support for nested field filtering
- Bug Fix: Fix issue with null / dates
- Bug Fix: Fix error with react-admin 1.13.0 for date inputs

## 0.1.0 (January 19, 2021)

- **Breaking change**: This release is a complete rewrite of the library, replacing the API with code from `ra-data-hasura-graphql` library. The `steams/ra-data-hasura-graphql` will henceforth be archived. Refer `README.md` for usage instructions.

## 0.0.8 (March 18, 2020)

- Bug Fix: Translate id to primary key for custom primary keys.
- Bug Fix: Respect primary key on order by.
- Bug Fix: Fix typo in GET_MANY_REFERENCE.
- Bug Fix: Set `asc` as default sorting order in GET_LIST.

## 0.0.7 (September 17, 2019)

- Bug Fix: Re-build library to fix discrepancies. Pass `where` arguments to `count` query.
- Feature: Add support for httpClient to pass in dynamic headers. Backwards compatibility maintained for static headers.
- Update package dependencies.

## 0.0.6 (June 14, 2019)

- Bug Fix: Fix sort order, fix primary key when response not an array and add filters to GET\_\* operations.

## 0.0.5 (May 16, 2019)

- Feature: Support specifying primary keys other than id for tables using a config object
  Example: `const config = { 'primaryKey': {'author': 'name'} }`

## 0.0.4 (April 25, 2019)

- Feature: Support multiple schemas using "." separator.
  Example: `<Resource name="schema.table" />`

## 0.0.3 (January 24, 2019)

- Bug Fix: Fix count query to support UUID

## 0.0.2 (January 20, 2019)

- Bug Fix: GET_MANY_REFERENCE definition

## 0.0.1 (January 19, 2019)

- Add support for hasura data provider
