/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: DecodeSSOTokenQuery
// ====================================================

export interface DecodeSSOTokenQuery_decodeSingleSignOnToken_SingleSignOnSuccess {
  __typename: "SingleSignOnSuccess";
  success: boolean | null;
  portalToken: string | null;
}

export interface DecodeSSOTokenQuery_decodeSingleSignOnToken_SingleSignOnError {
  __typename: "SingleSignOnError";
  success: boolean | null;
  code: string | null;
}

export type DecodeSSOTokenQuery_decodeSingleSignOnToken = DecodeSSOTokenQuery_decodeSingleSignOnToken_SingleSignOnSuccess | DecodeSSOTokenQuery_decodeSingleSignOnToken_SingleSignOnError;

export interface DecodeSSOTokenQuery {
  decodeSingleSignOnToken: DecodeSSOTokenQuery_decodeSingleSignOnToken | null;
}

export interface DecodeSSOTokenQueryVariables {
  token?: string | null;
}
