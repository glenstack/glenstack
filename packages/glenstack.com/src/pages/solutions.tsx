import React from "react";
import { graphql } from "gatsby";

import { Layout } from "../components/Layout";
import { SEO } from "../components/SEO";

const SolutionsPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Solutions" />
      <h1>Solutions</h1>
    </Layout>
  );
};

export default SolutionsPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
