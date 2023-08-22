const baseConfig = require('../../jest.config');

module.exports = {
  ...baseConfig,
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
  },
  preset: 'jest-preset-angular',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/projects/ngx-password-strength-bar-app/tsconfig.spec.json',
    },
  },
};
