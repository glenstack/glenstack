import React from "react";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDomain } from "../../providers/DomainProvider";
import { IdentityProviderQuery_portalForHost_identityProviders_edges_node } from "./__generated__/IdentityProviderQuery";

export const IdentityProvider = ({
  identityProvider: { name, singleSignOnInitiateEndpoint },
}: {
  identityProvider: IdentityProviderQuery_portalForHost_identityProviders_edges_node;
}) => {
  const domain = useDomain();
  const navigation = useNavigation();

  const login = () => {
    const url = new URL(
      `https://portal-auth.administratehq.com/oauth/initiate?portal_host=https://${domain}&initiate_endpoint=${singleSignOnInitiateEndpoint}&previous_path=/`
    );
    navigation.navigate("SSOWebViewModal", { url, domain });
  };

  return <Button title={name || ""} onPress={login} />;
};
