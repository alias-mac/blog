/**
 * Copyright (c) 2017-present Filipe Guerra
 */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import kebabCase from 'lodash.kebabcase';

import 'prismjs/themes/prism-okaidia.css';

export default function IndexPage(props) {
  return (
    <ul>
      {props.data.allMarkdownRemark.edges.map(({ node }) => (
        <li key={node.fields.slug}>
          <article>
            <Link to={node.fields.slug}><h1>{node.frontmatter.title}</h1></Link>
            <small>{node.timeToRead} minutes to read</small>
            <p>{node.excerpt}</p>
            <h4>Tags:</h4>
            <ul>
            {node.frontmatter.tags.map((tag) => (
              <li key={tag}><Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link></li>
            ))}
            </ul>
          </article>
        </li>
      ))}
    </ul>
  );
}

IndexPage.propTypes = {
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
};

export const pageQuery = graphql`
  query BlogPosts {
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { published: { eq: true } } }
      sort: { fields: [ fields___date ], order: DESC }
    ) {
      edges {
        node {
          excerpt
          timeToRead
          fields {
            slug
          }
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
`;
