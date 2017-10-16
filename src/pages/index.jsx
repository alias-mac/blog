/**
 * Copyright (c) 2017-present Filipe Guerra
 */

import React from 'react';
import PropTypes from 'prop-types';

export default function IndexPage(props) {
  return (
    <ul>
      {props.data.allMarkdownRemark.edges.map(({ node }) => (
        <li key={node.frontmatter.title}>
          {node.frontmatter.title}
        </li>
      ))}
    </ul>
  );
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        frontmatter: PropTypes.shape({
          title: PropTypes.string.isRequired,
        }).isRequired,
      })),
    }).isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query BlogPosts {
    allMarkdownRemark(
      limit: 10
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      edges {
        node {
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
