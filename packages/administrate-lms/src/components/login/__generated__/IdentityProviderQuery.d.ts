/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IdentityProviderQuery
// ====================================================

export interface IdentityProviderQuery_portalForHost_identityProviders_edges_node {
  __typename: "IdentityProvider";
  id: string | null;
  name: string | null;
  singleSignOnInitiateEndpoint: string | null;
}

export interface IdentityProviderQuery_portalForHost_identityProviders_edges {
  __typename: "IdentityProviderEdge";
  node: IdentityProviderQuery_portalForHost_identityProviders_edges_node | null;
}

export interface IdentityProviderQuery_portalForHost_identityProviders {
  __typename: "IdentityProviderConnection";
  edges: (IdentityProviderQuery_portalForHost_identityProviders_edges | null)[] | null;
}

export interface IdentityProviderQuery_portalForHost {
  __typename: "Portal";
  identityProviders: IdentityProviderQuery_portalForHost_identityProviders | null;
}

export interface IdentityProviderQuery {
  portalForHost: IdentityProviderQuery_portalForHost | null;
}

export interface IdentityProviderQueryVariables {
  host: ADMURL;
}
