/**
 * Copyright (c) 2017-present Filipe Guerra
 */

import React from 'react';
import Link from 'gatsby-link';
import kebabCase from 'lodash.kebabcase';

export default function Template({ pathContext }) {

  const { tagList } = pathContext;

  return (
    <section>
      <ul>
        {tagList.map(tag => (
          <li key={kebabCase(tag)}>
            <Link to={`tags/${kebabCase(tag)}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
