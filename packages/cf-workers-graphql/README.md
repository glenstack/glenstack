# Cloudflare Workers GraphQL

A lightweight [GraphQL](https://graphql.org/) Server for [Cloudflare Workers](https://workers.cloudflare.com/).

## Installation

```sh
npm install --save @glenstack/cf-workers-graphql
```

## Usage

```typescript
import { makeGraphQLHandler } from "@glenstack/cf-workers-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: (obj, args, context) =>
      context?.name ? `Hello, ${context?.name}!` : "Hello, world!",
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });
const handler = makeGraphQLHandler(schema, {
  makeContextValue: (request) =>
    Promise.resolve({ name: request.headers.get("X-Name") }),
});

const handleRequest = async (request) => {
  return await handler(request);
};

addEventListener("fetch", (event) => {
  const { request } = event;
  event.respondWith(handleRequest(request));
});
```

`makeGraphQLHandler` takes a two parameters:

1. A [GraphQLSchema](https://graphql.org/graphql-js/type/#graphqlschema).
1. Optionally, an object with the optional parameters:

   - `makeContextValue`: A function which takes a Request and returns a Promise of a context value which is given to the schema resolvers.
   - `makeErrorResponse`: A function which takes two parameters (the Request and an Error) which returns a Promise of either void or a custom Response. If you wish to log errors, do so from within this function.

It returns a Promise of a function which, in turn, takes [a GraphQL specification compliant GET or POST Request](https://graphql.org/learn/serving-over-http/#http-methods-headers-and-body) and returns a Promise of [a GraphQL specification compliant Response](https://graphql.org/learn/serving-over-http/#response).
