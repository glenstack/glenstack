import React, { useState, useEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useTokenDispatch } from "../../providers/TokenProvider";
import WebView from "react-native-webview";
import { useApolloClient, gql } from "@apollo/client";
import {
  DecodeSSOTokenQuery,
  DecodeSSOTokenQuery_decodeSingleSignOnToken_SingleSignOnSuccess,
} from "./__generated__/DecodeSSOTokenQuery";

const DECODE_SSO_TOKEN_QUERY = gql`
  query DecodeSSOTokenQuery($token: String) {
    decodeSingleSignOnToken(token: $token) {
      success
      ... on SingleSignOnSuccess {
        portalToken
      }
      ... on SingleSignOnError {
        code
      }
    }
  }
`;

export type SSOWebViewModalParams = {
  SSOWebViewModal: {
    url: URL;
    domain: string;
  };
};

type SSOWebViewModalRouteProp = RouteProp<
  SSOWebViewModalParams,
  "SSOWebViewModal"
>;

export const SSOWebViewModal = () => {
  const navigator = useNavigation();
  const client = useApolloClient();
  const tokenDispatch = useTokenDispatch();
  const { url, domain } = useRoute<SSOWebViewModalRouteProp>().params;
  const [jwt, setJWT] = useState<string | undefined>();
  const tokenRegex = new RegExp(`https:\/\/${domain}\/sso\/(?<jwt>.*)`);

  const login = (jwt: string) => {
    if (jwt) {
      (async () => {
        const { data } = await client.query<DecodeSSOTokenQuery>({
          query: DECODE_SSO_TOKEN_QUERY,
          variables: {
            token: jwt,
          },
        });

        if (
          data?.decodeSingleSignOnToken &&
          "portalToken" in data?.decodeSingleSignOnToken
        ) {
          // TODO: Decoded
          tokenDispatch(() =>
            Promise.resolve(
              (data.decodeSingleSignOnToken as DecodeSSOTokenQuery_decodeSingleSignOnToken_SingleSignOnSuccess)
                .portalToken || ""
            )
          );
          navigator.goBack();
        }
      })();
    }
  };

  useEffect(() => {
    if (jwt) login(jwt);
  }, [jwt]);

  return (
    <WebView
      source={{ uri: url.toString() }}
      userAgent={
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:77.0) Gecko/20100101 Firefox/77.0"
      }
      onNavigationStateChange={({ url }) => {
        const capturedJWT = url.match(tokenRegex)?.groups?.jwt;
        if (capturedJWT) {
          setJWT(capturedJWT);
        }

        // TODO: Also could capture from localStorage once the homepage has loaded. Definitely worth implementing in case we miss it in the SSO dance.
      }}
    />
  );
};
