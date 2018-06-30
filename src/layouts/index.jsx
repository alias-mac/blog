/**
 * Copyright (c) 2017-present Filipe Guerra
 */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import 'prismjs/themes/prism-okaidia.css';

import logo from './logo.png';

const Navbar = styled.nav`
  margin: 0 auto;
  max-width: 960px;
  padding: 10px 0 0;
  height: 100px;
`;

const HomeLogoLink = styled(Link)`
  float: left;
  padding: 0 20px;
`;

const HomeLink = styled(Link)`
  color: #262626;
  text-decoration: none;
`;

const BlogName = styled.h1`
  margin: 0;
  padding: 0;
  border-bottom: none;
  font-size: 46px;
  font-family: 'PT Sans';
  line-height: 60px;
  letter-spacing: -1px;
  text-shadow: 0 2px 0 #cecece;
`;

const Teaser = styled.h3`
  color: #7d7d7d;
  margin: 0;
  font-size: 23px;
  font-weight: normal;
  line-height: 28px;
  letter-spacing: -1px;
`;

const Content = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.0875rem 1.45rem;
  padding-top: 0;
`;

const Header = () => (
  <Navbar>
    <HomeLogoLink to="/" title="Home" rel="home">
      <img src={logo} alt="Home" />
    </HomeLogoLink>
    <BlogName>
      <HomeLink to="/" title="Home" rel="home">Open War</HomeLink>
    </BlogName>
    <Teaser>Make Code, Not War</Teaser>
  </Navbar>
);

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Open War | Make Code, Not War"
      meta={[
        { name: 'description', content: 'Blog about code and other ideas' },
        { name: 'keywords', content: 'blog, code, development, web development' },
      ]}
    />
    <Header />
    <Content>
      {children()}
    </Content>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};
TemplateWrapper.defaultProps = {
  children: undefined,
};

export default TemplateWrapper;
