/**
 * Copyright (c) 2017-present Filipe Guerra
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDisqusComments from 'react-disqus-comments';

export default function Template({ data }) {

  const { slug } = data.markdownRemark.fields;
  const { title } = data.markdownRemark.frontmatter;

  return (
    <article>
      <h1>{title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      />
      <ReactDisqusComments
        shortname="blog-open-war"
        title={title}
        url={`https://blog.open-war.com${slug}`}
      />
    </article>
  );
}

Template.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export const postQuery = graphql`
  query TemplateBlogMarkdown($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
