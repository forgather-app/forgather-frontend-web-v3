import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Layout from "@/components/layout/Layout";

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </Layout>
  ),
});
