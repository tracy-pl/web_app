const fs = require('node:fs');
const path = require('node:path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  extends: ['react-app', 'prettier'],
  plugins: ['prettier'],
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: { 'prettier/prettier': ['warn', prettierOptions] },
    },
  ],
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    '@typescript-eslint/no-redeclare': 0,
  },
};
