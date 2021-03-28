/**
 * Copyright (c) 2017-present Filipe Guerra
 */

import { DiscussionEmbed } from 'disqus-react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Tags from '../components/Tags';
import TimeToRead from '../components/TimeToRead';

const Title = styled.h1`
  margin-bottom: 0;
`;

export default function Template({ data }) {

  const { slug } = data.markdownRemark.fields;
  const { tags, title } = data.markdownRemark.frontmatter;

  return (
    <Layout>
      <article>
        <Title>{title}</Title>
        <TimeToRead minutes={data.markdownRemark.timeToRead} />
        <div
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
        <h4>Tags:</h4>
        <Tags list={tags} />
        <DiscussionEmbed
          shortname="blog-open-war"
          config={{
            title,
            url: `https://blog.open-war.com${slug}`,
          }}
        />
      </article>
    </Layout>
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
