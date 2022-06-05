# ra-data-hasura Example

A sample React Admin app using ra-data-hasura and the [Hasura Super App schema](https://github.com/hasura/hasura-ecommerce).

In the future, login functionality will be added. Meanwhile, a JWT representing a site-admin role has been pre-generated.

You should be able to view, edit, and delete different schema items as well as see their relationships.

To run:

```bash
docker compose up -d

hasura seed apply --database-name default --project hasura

npm i

npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
