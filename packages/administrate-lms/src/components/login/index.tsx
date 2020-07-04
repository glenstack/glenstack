import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useDomain } from "../../providers/DomainProvider";
import { LoginQuery } from "./__generated__/LoginQuery";
import { UsernamePassword } from "./usernamePassword";
import { ErrorBanner } from "./errorBanner";
import { IdentityProviders } from "./identityProviders";
import {
  useNavigation,
  CommonActions,
  StackActions,
} from "@react-navigation/native";

const LOGIN_QUERY = gql`
  query LoginQuery($host: URL!) {
    portalForHost(host: $host) {
      singleSignOnOnly
      termsAndConditions
      brand {
        id
        name
        branding {
          images {
            favicon {
              imageUrl
            }
          }
        }
      }
    }
    viewer {
      username
    }
  }
`;

// TODO: Forgot password

export const Login = () => {
  const domain = useDomain();
  const navigation = useNavigation();
  const { data } = useQuery<LoginQuery>(LOGIN_QUERY, {
    variables: { host: domain },
    errorPolicy: "ignore",
  });

  if (data?.viewer?.username)
    navigation.dispatch(StackActions.replace("Course List"));

  return (
    <>
      <ErrorBanner />
      {!data?.portalForHost?.singleSignOnOnly && <UsernamePassword />}
      <IdentityProviders />
    </>
  );
};
