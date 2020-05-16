/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

export const SEO = ({ description, lang, meta, title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          buildTime(formatString: "YYYY-MM-DD")
          siteMetadata {
            title
            description
            keywords
            siteUrl
            social {
              href
            }
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  const jsonld = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    "@id": `${site.siteMetadata.siteUrl}#GlenstackWebsite`,
    about: {
      "@type": "Organization",
      "@id": `${site.siteMetadata.siteUrl}#Glenstack`,
      brand: {
        "@type": "Brand",
        "@id": `${site.siteMetadata.siteUrl}#GlenstackBrand`,
        logo: site.siteMetadata.logoUrl,
        description: "Glenstack",
        image: site.siteMetadata.logoUrl,
        name: "Glenstack",
        url: site.siteMetadata.siteUrl,
      },
      description: site.siteMetadata.description,
      email: site.siteMetadata.emailAddress,
      employee: [
        {
          "@type": "Person",
          "@id": "https://gregbrimble.com/#GregBrimble",
          jobTitle: "Founder",
          mainEntityOfPage: "https://gregbrimble.com/",
          name: "Greg Brimble",
          sameAs: "https://gregbrimble.com/",
          url: "https://gregbrimble.com/",
          worksFor: [
            {
              "@type": "Organization",
              "@id": `${site.siteMetadata.siteUrl}#Glenstack`,
            },
          ],
        },
        {
          "@type": "Person",
          "@id": "https://www.james-odonnell.com/#JamesODonnell",
          jobTitle: "Founder",
          mainEntityOfPage: "https://www.james-odonnell.com/",
          name: "James O'Donnell",
          sameAs: "https://www.james-odonnell.com/",
          url: "https://www.james-odonnell.com/",
          worksFor: [
            {
              "@type": "Organization",
              "@id": `${site.siteMetadata.siteUrl}#Glenstack`,
            },
          ],
        },
      ],
      founder: [
        {
          "@type": "Person",
          "@id": "https://gregbrimble.com/#GregBrimble",
        },
        {
          "@type": "Person",
          "@id": "https://www.james-odonnell.com/#JamesODonnell",
        },
      ],
      foundingDate: "2020-05-11",
      image: site.siteMetadata.logoUrl,
      legalName: "Glenstack Ltd",
      mainEntityOfPage: site.siteMetadata.siteUrl,
      name: "Glenstack",
      sameAs: site.siteMetadata.social.map(({ href }) => href),
      url: site.siteMetadata.siteUrl,
    },
    alternativeHeadline: site.siteMetadata.description,
    copyrightHolder: {
      "@type": "Organization",
      id: `${site.siteMetadata.siteUrl}#Glenstack`,
    },
    copyrightYear: "2020",
    dateCreated: "2020-05-11",
    dateModified: site.buildTime,
    datePublished: "2020-05-11",
    headline: site.siteMetadata.title,
    inLanguage: "en",
    isAccessibleForFree: "http://schema.org/True",
    isFamilyFriendly: "http://schema.org/True",
    keywords: site.siteMetadata.keywords.join(","),
    mainEntity: {
      "@type": "Organization",
      id: `${site.siteMetadata.siteUrl}#Glenstack`,
    },
    description: site.siteMetadata.description,
    name: "Glenstack",
    sameAs: site.siteMetadata.social.map(({ href }) => href),
    url: site.siteMetadata.siteUrl,
  };

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      <script type="application/ld+json">{JSON.stringify(jsonld)}</script>
    </Helmet>
  );
};

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};
