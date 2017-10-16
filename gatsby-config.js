/**
 * Copyright (c) 2017-present Filipe Guerra
 */

module.exports = {
  siteMetadata: {
    title: 'Open War | Make Code, Not War',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    'gatsby-transformer-remark',
  ],
};
