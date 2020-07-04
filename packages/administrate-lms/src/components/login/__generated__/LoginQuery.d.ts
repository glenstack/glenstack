/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: LoginQuery
// ====================================================

export interface LoginQuery_portalForHost_brand_branding_images_favicon {
  __typename: "BrandingImage";
  imageUrl: string | null;
}

export interface LoginQuery_portalForHost_brand_branding_images {
  __typename: "BrandingImages";
  favicon: LoginQuery_portalForHost_brand_branding_images_favicon | null;
}

export interface LoginQuery_portalForHost_brand_branding {
  __typename: "Branding";
  images: LoginQuery_portalForHost_brand_branding_images | null;
}

export interface LoginQuery_portalForHost_brand {
  __typename: "Brand";
  id: string | null;
  name: string | null;
  branding: LoginQuery_portalForHost_brand_branding | null;
}

export interface LoginQuery_portalForHost {
  __typename: "Portal";
  singleSignOnOnly: boolean | null;
  termsAndConditions: string | null;
  brand: LoginQuery_portalForHost_brand | null;
}

export interface LoginQuery_viewer {
  __typename: "Viewer";
  username: string | null;
}

export interface LoginQuery {
  portalForHost: LoginQuery_portalForHost | null;
  viewer: LoginQuery_viewer | null;
}

export interface LoginQueryVariables {
  host: ADMURL;
}
