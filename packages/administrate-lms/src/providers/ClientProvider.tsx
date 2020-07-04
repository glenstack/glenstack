import React, { FC, useEffect } from "react";
import { ApolloProvider, from, ApolloLink, useQuery } from "@apollo/client";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/link-error";
import { setContext } from "@apollo/link-context";
import { useToken, useTokenDispatch } from "./TokenProvider";
import { USER_AGENT, ADMINISTRATE_LMS_GRAPHQL_ENDPOINT } from "../config";
import { AdministrateLMSError } from "../errors";
import { getGuestToken } from "../auth/tokens";
import { useDomain } from "./DomainProvider";
import { useNavigation } from "@react-navigation/native";

const httpLink = new HttpLink({
  uri: ADMINISTRATE_LMS_GRAPHQL_ENDPOINT,
});

const userAgentMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      "User-Agent": USER_AGENT,
    },
  }));

  return forward(operation);
});

export const ClientProvider: FC = ({ children }) => {
  const domain = useDomain();
  const tokenState = useToken();
  const tokenDispatch = useTokenDispatch();

  const unauthenticatedErrorMiddleware = onError(
    ({ networkError, graphQLErrors }) => {
      if (graphQLErrors) {
        console.log(graphQLErrors);
      } else if (networkError instanceof AdministrateLMSError) {
        tokenDispatch && tokenDispatch(() => getGuestToken({ domain }));
        throw networkError;
      } else {
        // TODO: Unknown Error!
      }
    }
  );

  const authMiddleware = setContext(async (request, { headers }) => {
    const token = await tokenState;

    if (token.error || token.token === undefined) throw new Error(token.error);

    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token.token}`,
      },
    };
  });

  const client = new ApolloClient({
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            portalForHost: {
              merge(existing = {}, incoming: any) {
                return { ...existing, ...incoming };
              },
            },
          },
        },
      },
    }),
    link: from([
      unauthenticatedErrorMiddleware,
      authMiddleware,
      userAgentMiddleware,
      httpLink,
    ]),
  });

  useEffect(() => {
    client.resetStore();
  }, [tokenState]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
