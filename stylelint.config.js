export default {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-scss'],
  rules: {
    'scss/at-rule-no-unknown': null,
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['composes'],
      },
    ],
    'selector-class-pattern': null,
    'custom-property-pattern': null,
    'scss/dollar-variable-pattern': null,
    'scss/percent-placeholder-pattern': null,
    'scss/no-global-function-names': null,
  },
  ignoreFiles: ['node_modules/**', 'build/**', 'dist/**'],
};
