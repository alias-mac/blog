
import React, { PureComponent } from 'react';
import Link from 'gatsby-link';

import kebabCase from 'lodash.kebabcase';

export default class Tags extends PureComponent {

  render() {

    const { list } = this.props;

    return (
      <ul style={{
        listStyle: 'none',
        margin: 0,
      }}>
        {list.map((tag) => (
          <li
            key={tag}
            style={{
              display: 'inline',
              margin: '0 0.5rem',
            }}
          ><Link className="tags__link" to={`/tags/${kebabCase(tag)}/`}>{tag}</Link></li>
        ))}
      </ul>
    );
  }

}
