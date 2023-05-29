# Changelog

## 0.5.6 (May 29, 2023)

- Feature: Support Disabling Pagination, thanks to @alioguzhan
- Feature: Support for JSONB filtering, thanks to @jbek7

## 0.5.5 (December 21, 2022)

- Feature: Hasura raw query nested filtering support, thanks to @n3n
- Feature: Ability to support sorting nulls_first and nulls_last, thanks to @n3n
- Update: graphql v16

## 0.5.4 (November 22, 2022)

- Update all dependencies
- Fix: remove `graphql-ast-types-browser` dependency

## 0.5.3 (August 16, 2022)

- Feature: distinct_on support (#124), thanks to @bharatkashyap
- Feature: added support for empty operator in buildGetListVariables (#125), thanks to @ofilipowicz

## 0.5.2 (July 27, 2022)

- Update to GraphQL 16
- Fix: only filter out GraphQL reserved names (#116), thanks to @n3n
- Feature: Support skipping count aggregate on hasura (#120), thanks to @mohammad-bolt

## 0.5.1 (June 14, 2022)

- Fix dependency issue

## 0.5.0 (June 6, 2022)

- Upgrade library and sample to React Admin v4, thanks to @LucaColonnello

## 0.4.2 (May 6, 2022)

- Example: Add Example v3 App
- Feature: \_nin operator (#89), thanks to @fkowal
- Feature: Enable support for \_contains operator and nested path in jsonb joins, thanks to @fkowal
- Feature: Support nested fields when sorting by multiple columns, thanks to @daa
- Bug Fix: buildFields types (#91), thanks to @cpv123
- Bug Fix: Keep null values when sanitizing resources (#97), thanks to @nselikoff

## 0.4.1 (April 7, 2022)

- Bug Fix: Variables for mutations are not being populated, thanks to @nselikoff

## 0.4.0 (March 2, 2022)

- Full Typescript rewrite thanks to Chris Vibert @cpv123

## 0.3.0 (March 2, 2022)

- Bug Fix: Update only includes edited fields
- Feature: Support sorting by multiple fields
- Bug Fix: Return dataProvider object, not function
- Bug fix: nested keys with array values

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
