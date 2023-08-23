const baseConfig = require('../../jest.base.config');
const { defaultTransformerOptions } = require('jest-preset-angular/presets');

module.exports = {
  ...baseConfig,
  preset: 'jest-preset-angular',
  transform: {
    '^.+\\.(ts|js|html|svg)$': [
      'jest-preset-angular',
      {
        ...defaultTransformerOptions,
        tsconfig: '<rootDir>/projects/ngx-password-strength-bar/tsconfig.spec.json',
      },
    ],
  },
};
