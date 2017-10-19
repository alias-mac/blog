/**
 * Copyright (c) 2017-present Filipe Guerra
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import kebabCase from 'lodash.kebabcase';

export default function Template({ data, pathContext }) {

  const { tag } = pathContext;
  const { edges } = data.allMarkdownRemark;

  return (
    <section>
      <Helmet>
        <title>{`Posts tagged as "${tag}" | Open War`}</title>
        <link rel="canonical" href={`https://blog.open-war.com/tags/${kebabCase(tag)}`} />
      </Helmet>
      <ul>
        {edges.map(({ node }) => (
          <li key={node.fields.slug}>
            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

Template.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.shape({
          fields: PropTypes.shape({
            slug: PropTypes.string.isRequired,
          }).isRequired,
          frontmatter: PropTypes.shape({
            title: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      })),
    }).isRequired,
  }).isRequired,
  pathContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }).isRequired,
};

export const tagQuery = graphql`
  query TagPage($tag: String!) {
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
