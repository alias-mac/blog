/**
 * Copyright (c) 2017-present Filipe Guerra
 */

import { Link } from 'gatsby';
import kebabCase from 'lodash.kebabcase';
import React from 'react';
import Layout from '../components/Layout';

export default function Template({ pageContext }) {
  const { tagList } = pageContext;

  return (
    <Layout>
      <section>
        <ul>
          {tagList.map((tag) => (
            <li key={kebabCase(tag)}>
              <Link to={`/tags/${kebabCase(tag)}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
