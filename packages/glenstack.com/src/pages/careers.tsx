import React from "react";
import { graphql } from "gatsby";

import { Layout } from "../components/Layout";
import { SEO } from "../components/SEO";

const CareersPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Careers" />
      <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg mx-auto lg:max-w-7xl">
          <div>
            <h1 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10 ">
              Careers
            </h1>
            <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
              <p className="text-xl leading-7 text-gray-500">
                Join the Glenstack team.
              </p>
              <form className="mt-6 flex lg:mt-0 lg:justify-end">
                <input
                  aria-label="Email address"
                  type="email"
                  required
                  className="appearance-none w-full px-4 py-2 border border-gray-300 text-base leading-6 rounded-md text-gray-900 bg-white placeholder-gray-500 focus:outline-none focus:shadow-outline-glenstack focus:border-glenstack-300 transition duration-150 ease-in-out lg:max-w-xs"
                  placeholder="Enter your email"
                />
                <span className="ml-3 flex-shrink-0 inline-flex rounded-md shadow-sm">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-glenstack-600 hover:bg-glenstack-500 focus:outline-none focus:border-glenstack-700 focus:shadow-outline-glenstack active:bg-glenstack-700 transition ease-in-out duration-150"
                  >
                    Notify me
                  </button>
                </span>
              </form>
            </div>
          </div>
          <div className="mt-6 grid gap-16 border-t-2 border-gray-100 pt-10">
            <div className="text-base leading-6 text-gray-500">
              No listings at the moment. Check back again soon or{" "}
              <a
                href="mailto:hello@glenstack.com"
                className="underline text-glenstack-900"
              >
                drop us an email
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CareersPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
