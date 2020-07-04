import React from "react";
import { View, Text } from "react-native";
import { useQuery, gql } from "@apollo/client";
import { useDomain } from "../../providers/DomainProvider";
import { IdentityProviderQuery } from "./__generated__/IdentityProviderQuery";
import { IdentityProvider } from "./identityProvider";

const IDENTITY_PROVIDERS_QUERY = gql`
  query IdentityProviderQuery($host: URL!) {
    portalForHost(host: $host) {
      identityProviders {
        # There is no relay connection options for this field. Once we hit the page limit, there will be no way to see other identity providers.
        edges {
          node {
            id
            name
            singleSignOnInitiateEndpoint
          }
        }
      }
    }
  }
`;

export const IdentityProviders = () => {
  const domain = useDomain();
  const { loading, error, data } = useQuery<IdentityProviderQuery>(
    IDENTITY_PROVIDERS_QUERY,
    {
      variables: { host: domain },
    }
  );

  // TODO: Loading & error fallbacks
  if (loading) return <Text>Loading SSO options...</Text>;
  if (error) {
    return <Text>Failed to load SSO options!</Text>;
  }

  return (
    <View>
      {data?.portalForHost?.identityProviders?.edges?.map(
        (identityProvider) =>
          identityProvider?.node && (
            <IdentityProvider
              key={
                identityProvider.node.id ||
                JSON.stringify(identityProvider.node)
              }
              identityProvider={identityProvider.node}
            />
          )
      )}
    </View>
  );
};
