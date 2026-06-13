import { ThemeProvider } from "@emotion/react";
import type { Preview } from "@storybook/react-vite";
import GlobalStyle from "../src/styles/GlobalStyle";
import { theme } from "../src/styles/theme";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <div
          style={{
            backgroundColor: theme.colors.gray.gray700,
            minHeight: "100vh",
            padding: "16px",
          }}
        >
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      autodocs: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
