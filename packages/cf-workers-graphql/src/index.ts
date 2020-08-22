import { graphql, GraphQLSchema, Source } from "graphql";

type GraphQLRequest = {
  source: Source | string;
  rootValue?: any;
  contextValue?: any;
  variableValues?: { [key: string]: any };
  operationName?: string;
};

export type ErrorResponseMaker = (
  request: Request,
  error: Error
) => Promise<void | Response>;
export type ContextValueMaker = (request: Request) => Promise<any>;

const makeGraphQLRequestFromGet = async (
  request: Request
): Promise<GraphQLRequest> => {
  const url = new URL(request.url);

  return {
    source: url.searchParams.get("query"),
    variableValues: JSON.parse(url.searchParams.get("variables") || "null"),
    operationName: url.searchParams.get("operationName") || undefined,
  };
};

const makeGraphQLRequestFromPost = async (
  request: Request
): Promise<GraphQLRequest> => {
  const { query, variables, operationName } = await request.json();

  return {
    source: query,
    variableValues: variables,
    operationName,
  };
};

export const makeResponse = (data: any) =>
  new Response(JSON.stringify(data), {
    headers: { "Content-Type": `application/json` },
  });

export const makeGraphQLHandler = (
  schema: GraphQLSchema,
  {
    makeContextValue,
    makeErrorResponse,
  }: {
    makeContextValue?: ContextValueMaker;
    makeErrorResponse?: ErrorResponseMaker;
  } = {}
) => async (request: Request): Promise<Response> => {
  makeContextValue = makeContextValue || (() => Promise.resolve(undefined));
  makeErrorResponse = makeErrorResponse || (() => Promise.resolve());

  let graphQLRequest: GraphQLRequest;

  try {
    switch (request.method.toLowerCase()) {
      case `get`:
        graphQLRequest = await makeGraphQLRequestFromGet(request);
        break;
      case `post`:
        graphQLRequest = await makeGraphQLRequestFromPost(request);
        break;
      default:
        return new Response(null, { status: 405 });
    }
    graphQLRequest.contextValue = await makeContextValue(request);
  } catch (error) {
    return makeResponse({
      errors: [{ message: `Syntax Error: Could not parse request` }],
    });
  }

  try {
    const result = await graphql(
      schema,
      graphQLRequest.source,
      graphQLRequest.rootValue,
      graphQLRequest.contextValue,
      graphQLRequest.variableValues,
      graphQLRequest.operationName
    );
    return makeResponse(result);
  } catch (error) {
    return (
      (await makeErrorResponse(request, error)) ||
      makeResponse({ errors: [{ message: `Internal Error` }] })
    );
  }
};
