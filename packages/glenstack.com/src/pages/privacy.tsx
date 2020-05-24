import React from "react";
import { graphql } from "gatsby";

import { Layout } from "../components/Layout";
import { SEO } from "../components/SEO";

const PrivacyPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Privacy" />
      <h1>Privacy</h1>
    </Layout>
  );
};

export default PrivacyPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
