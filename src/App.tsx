import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import ErrorModalProvider from "./components/@common/ErrorModal/ErrorModalProvider";
import RootErrorBoundary from "./components/@common/RootErrorBoundary/RootErrorBoundary";
import SnackBarProvider from "./components/@common/SnackBar/SnackBarProvider";
import { routeTree } from "./routeTree.gen";
import GlobalStyle from "./styles/GlobalStyle";
import { theme } from "./styles/theme";

const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  defaultErrorComponent: RootErrorBoundary,
});

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
          <ErrorModalProvider>
            <GlobalStyle />
            <RouterProvider router={router} />
          </ErrorModalProvider>
        </SnackBarProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
