import type { Preview } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../src/index.css";
import React from "react";

/**
 * Global Storybook decorators.
 *
 * withThemeByClassName — has sole ownership of the <html> dark class in Storybook.
 * Clicking the light/dark toolbar button adds/removes "astralis-dark" from <html>,
 * which triggers the semantic token overrides in semantic.css and applies dark mode
 * to the entire canvas without any provider conflict.
 *
 * The second decorator wraps every story in a .astralis div for base styles
 * (font-family, background-color, color, box-sizing reset). No AstralisProvider
 * is used here so individual stories are not burdened with provider height/context.
 */

export const decorators = [
  withThemeByClassName({
    themes: {
      light: "",
      dark: "astralis-dark",
    },
    defaultTheme: "light",
  }),
  (Story) => (
    <div className="astralis astralis:flex astralis:justify-center astralis:items-center" style={{ width: "100%", padding: "2rem" }}>
      <Story />
    </div>
  ),
];

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
