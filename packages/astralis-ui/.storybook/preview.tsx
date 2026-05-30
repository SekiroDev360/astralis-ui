import type { Preview } from '@storybook/react-vite'
import { withThemeByClassName } from '@storybook/addon-themes';
import '../src/index.css';
import { AstralisProvider } from '../src/theme';
import React from 'react';

export const decorators = [
  withThemeByClassName({
    themes: {
      light: '',
      dark: 'astralis-dark',
    },
    defaultTheme: 'light',
  }),
  (Story) => (
    <AstralisProvider>
      <Story />
    </AstralisProvider>
  ),
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    }
  },
};

export default preview;