import { makeExecutableSchema } from "@graphql-tools/schema";
import gql from "graphql-tag";
import { makeGraphQLHandler } from ".";

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

describe("makeGraphQLHandler", () => {
  it("returns a function which executes GraphQL requests", async () => {
    const getRequest = new Request("http://fakehost/graphql?query={ hello }");
    const getResponse = await handler(getRequest);
    const getData = await getResponse.json();
    expect(getData).toEqual({
      data: { hello: "Hello, world!" },
    });

    const postRequest = new Request("http://fakehost/graphql", {
      method: "POST",
      body: JSON.stringify({ query: "{ hello }" }),
      headers: {
        "X-Name": "John Smith",
      },
    });
    const postResponse = await handler(postRequest);
    const postData = await postResponse.json();
    expect(postData).toEqual({ data: { hello: "Hello, John Smith!" } });
  });
});
