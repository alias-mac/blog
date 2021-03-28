
import React, { PureComponent } from 'react';
import {Link} from 'gatsby';
import styled from 'styled-components';

import kebabCase from 'lodash.kebabcase';

const TagList = styled.ul`
  list-style: none;
  margin: 0;

  li {
    display: inline;
    margin: 0 0.5rem;
  }
`;

export default class Tags extends PureComponent {

  render() {

    const { list } = this.props;

    return (
      <TagList>
        {list.map(tag => (
          <li key={tag}>
            <Link className="tags__link" to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
          </li>
        ))}
      </TagList>
    );
  }

}
