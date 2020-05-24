import React from "react";
import { graphql } from "gatsby";

import { Layout } from "../components/Layout";
import { SEO } from "../components/SEO";

const TermsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Terms" />
      <h1>Terms</h1>
    </Layout>
  );
};

export default TermsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
