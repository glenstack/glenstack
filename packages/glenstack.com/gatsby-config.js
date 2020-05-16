module.exports = {
  siteMetadata: {
    title: `Glenstack`,
    description: `Description of Glenstack.`,
    keywords: ["internet"],
    siteUrl: "https://glenstack-com.glenstack.workers.dev/",
    logoUrl: "https://glenstack-com.glenstack.workers.dev/logo.png",
    emailAddress: "hello@glenstack.com",
    social: [
      { label: "WikiData", href: "https://www.wikidata.org/wiki/Q94578094" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/glenstack/",
      },
      { label: "GitHub", href: "https://github.com/glenstack" },
      { label: "DEV", href: "https://dev.to/glenstack" },
      { label: "Instagram", href: "https://www.instagram.com/glenstack/" },
      {
        label: "Facebook",
        href: "https://www.facebook.com/Glenstack-112319017143183/",
      },
    ],
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `GatsbyJS`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        // icon: `content/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-react-native-web`,
    `gatsby-plugin-postcss`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
