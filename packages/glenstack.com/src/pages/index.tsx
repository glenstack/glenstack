import React, { useState } from "react";
import { PageProps, Link, graphql } from "gatsby";

import { Layout } from "../components/Layout";
import { SEO } from "../components/SEO";

type Data = {
  site: {
    siteMetadata: {
      title: string;
    };
  };
};

const BlogIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Homepage" />
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
