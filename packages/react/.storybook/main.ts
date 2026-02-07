import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  // Nur src indexieren, keine node_modules
  staticDirs: [],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@msqdx/tokens': path.resolve(__dirname, '../../tokens/dist/index.js'),
        },
      },
      // Storybook Manager/Vite: Pre-transform-Runtime fehlend kann Index-Fehler verursachen
      assetsInclude: ['**/sb-preview/runtime.js', '**/sb-manager/globals-runtime.js'],
      server: {
        host: '0.0.0.0',
        fs: { allow: [path.resolve(__dirname, '../..')] },
      },
    });
  },
};

export default config;
