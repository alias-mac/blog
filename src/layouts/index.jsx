/**
 * Copyright (c) 2017-present Filipe Guerra
 */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import logo from './logo.png';

import './index.css';

const Header = () => (
  <div
    style={{
      margin: '0 auto',
      maxWidth: 960,
      padding: '10px 0 0',
      height: '100px',
    }}
  >
    <Link
      to="/"
      title="Home"
      rel="home"
      style={{
        float: 'left',
        padding: '0 20px',
      }}
    >
      <img src={logo} alt="Home" />
    </Link>
    <h1 style={{
        margin: 0,
        padding: 0,
        fontSize: '60px',
        lineHeight: '55px',
        letterSpacing: '-1px',
        textShadow: '0 1px 0 #fff',
      }}
    >
      <Link
        to="/"
        title="Home"
        rel="home"
        style={{
          color: '#262626',
          textDecoration: 'none',
        }}
      >
        Open War
      </Link>
    </h1>
    <h3
      style={{
        color: '#7d7d7d',
        margin: 0,
        padding: '15px 0 0',
        fontSize: '24px',
        fontWeight: 'normal',
        lineHeight: '28px',
        letterSpacing: '-1px',
      }}
    >
      Make Code, Not War
    </h3>
  </div>
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
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};
TemplateWrapper.defaultProps = {
  children: undefined,
};

export default TemplateWrapper;
