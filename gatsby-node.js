/**
 * Copyright (c) 2017-present Filipe Guerra
 */

const { resolve } = require('path');

/**
 * Create blog pages.
 *
 * @see https://www.gatsbyjs.org/docs/node-apis/#createPages
 */
exports.createPages = async ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const blogTemplate = resolve('./src/templates/blog.jsx');

  const allMarkdown = await graphql(`{
    allMarkdownRemark(limit: 1000) {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
  }`);

  if (allMarkdown.errors) {
    throw Error(allMarkdown.errors);
  }

  allMarkdown.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: blogTemplate,
      context: {
        slug: node.fields.slug,
      },
    });
  });
};

// Parse date information out of blog post filename.
const BLOG_POST_FILENAME_REGEX = /([0-9]+)-([0-9]+)-([0-9]+)-(.+?)\/index.md$/;

/**
 * Add custom fields to MarkdownRemark nodes.
 */
exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type !== 'MarkdownRemark') {
    return;
  }

  const { relativePath } = getNode(node.parent);

  let slug;

  // might want to add more content types (e.g. projects).
  if (relativePath.includes('blog')) {
    // Blog's slugs follow a pattern: /title
    // The date portion comes from the folder name: <date>-<title>/index.md
    // images and other content related to the blog are in the same folder
    const match = BLOG_POST_FILENAME_REGEX.exec(relativePath);
    const year = match[1];
    const month = match[2];
    const day = match[3];
    const title = match[4];

    slug = `/${title}`;

    const date = new Date(year, month - 1, day);

    // Blog posts are sorted by date.
    createNodeField({
      node,
      name: 'date',
      value: date.toJSON(),
    });
  }

  // Used to generate URL to view this content.
  createNodeField({
    node,
    name: 'slug',
    value: slug,
  });
};
