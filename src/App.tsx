import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import SnackBarProvider from "./components/@common/SnackBar/SnackBarProvider";
import { routeTree } from "./routeTree.gen";
import GlobalStyle from "./styles/GlobalStyle";
import { theme } from "./styles/theme";

const queryClient = new QueryClient();
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SnackBarProvider>
          <GlobalStyle />
          <RouterProvider router={router} />
        </SnackBarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
