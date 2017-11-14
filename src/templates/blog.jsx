/**
 * Copyright (c) 2017-present Filipe Guerra
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDisqusComments from 'react-disqus-comments';
import { Link } from 'react-router-dom';
import kebabCase from 'lodash.kebabcase';

import TimeToRead from '../components/TimeToRead';

export default function Template({ data }) {

  const { slug } = data.markdownRemark.fields;
  const { tags, title } = data.markdownRemark.frontmatter;

  return (
    <article>
      <h1>{title}</h1>
      <TimeToRead minutes={data.markdownRemark.timeToRead}/>
      <div
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      />
      <h4>Tags:</h4>
      <ul>
        {tags.map(tag => (
          <li key={kebabCase(tag)}><Link to={`tags/${kebabCase(tag)}`}>{tag}</Link></li>
        ))}
      </ul>
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
      timeToRead
      fields {
        slug
      }
      frontmatter {
        tags
        title
      }
    }
  }
`;
