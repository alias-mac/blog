
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Typography from 'typography';
import CodePlugin from 'typography-plugin-code';
import Theme from 'typography-theme-github';

import ExternalLinkIcon from '../components/ExternalLinkIcon';

function getExternalLinkUrl(props) {

  const externalLinkString = ReactDOMServer.renderToStaticMarkup(<ExternalLinkIcon {...props} />);
  const externalLinkBase64 = new Buffer(externalLinkString).toString('base64');

  return `data:image/svg+xml;base64,${externalLinkBase64}`;
}

Theme.plugins = [
  new CodePlugin(),
];

Theme.overrideThemeStyles = (typography, options, styles) => ({

  '.gatsby-highlight pre': {
    boxShadow: '1px 1px 20px rgba(20, 20, 20, 0.27)',
  },

  'a[href*="://"]:after': {
    content: `" " url(${getExternalLinkUrl({
      color: styles.a.color,
      height: 10,
      width: 10,
    })})`,
    top: '-5px',
    position: 'relative',
  },
});

const typography = new Typography(Theme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
