import type { Preview } from "@storybook/react-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../src/index.css";
import { AstralisProvider } from "../src/theme";
import React from "react";

export const decorators = [
  withThemeByClassName({
    themes: {
      light: "",
      dark: "astralis-dark",
    },
    defaultTheme: "light",
  }),
  (Story) => (
    <div className="astralis-w-full astralis-flex astralis-items-center astralis-justify-center">
      <div className="astralis-w-[700px]">
        <AstralisProvider>
          <Story />
        </AstralisProvider>
      </div>
    </div>
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
      test: "todo",
    },
  },
};

export default preview;
