module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  extends: ['airbnb'],
  rules: {
    // in jest this is normal
    'func-names': ['error', 'never'],
    'prefer-arrow-callback': 'off',

    // https://github.com/evcohen/eslint-plugin-jsx-a11y/issues/51
    'jsx-a11y/label-has-for': 'off',

    // in this case this the final generated contents will be deployed
    'import/no-extraneous-dependencies': 'off',

    // https://github.com/facebookincubator/create-react-app uses js too
    'react/jsx-filename-extension': 'off',
    'react/jsx-one-expression-per-line': 'off',

    // let the code breathe!
    'padded-blocks': 'off',
  },
};
