const baseConfig = require('../../jest.base.config');
const {defaultTransformerOptions} = require("jest-preset-angular/presets");

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/projects/ngx-password-strength-bar-app/src'],
  // modulePathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/package.json"],
  // moduleNameMapper: {
  //   'ngx-password-strength-bar': '<rootDir>/dist/ngx-password-strength-bar/package.json',
  // },
  modulePaths: ['<rootDir>/dist'],
  preset: 'jest-preset-angular',
  transform: {
    '^.+\\.(ts|js|html|svg)$': [
      'jest-preset-angular',
      {
        ...defaultTransformerOptions,
        tsconfig: '<rootDir>/projects/ngx-password-strength-bar-app/tsconfig.spec.json',
      },
    ],
  },
};
