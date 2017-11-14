import Typography from 'typography';
import CodePlugin from 'typography-plugin-code';
import Theme from 'typography-theme-github';

Theme.plugins = [
  new CodePlugin(),
];

Theme.overrideThemeStyles = (typography, options) => ({
  '.gatsby-highlight pre': {
    boxShadow: '1px 1px 20px rgba(20, 20, 20, 0.27)',
  },
});

const typography = new Typography(Theme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
