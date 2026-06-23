const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const babelParser = require('@babel/eslint-parser');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = [
  ...compat.extends('@upstatement/eslint-config/react'),
  {
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2024,
        sourceType: 'module',
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
    },
    settings: {
      react: {
        version: '19.2.7',
      },
    },
    rules: {
      'react/display-name': 'off',
    },
  },
];
