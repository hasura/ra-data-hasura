# ra-data-hasura Example

A sample React Admin app using ra-data-hasura and the [Hasura Super App schema](https://github.com/hasura/hasura-ecommerce).

In the future login functiuonality will be added, in the meantime a JWT representing a site-admin role has been pre-generated.

You should be able to view, edit, and delete different schema items as well as seeing their relationships.

To run:

```bash
docker compose up -d

hasura seed apply --database-name default

npm i

npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
