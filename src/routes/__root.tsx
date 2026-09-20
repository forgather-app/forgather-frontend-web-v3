import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Layout from "@/components/layout/Layout/Layout";
import NotFoundPage from "@/pages/notFound/NotFoundPage";

// 랜딩 페이지만 전체 화면으로 보여주고, 그 외 페이지는 공통 레이아웃을 적용한다
const FULL_WIDTH_PATHS = ["/landing"];

const RootComponent = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isFullWidthPage = FULL_WIDTH_PATHS.some((path) =>
    pathname.startsWith(path),
  );

  if (isFullWidthPage) {
    return (
      <>
        <Outlet />
        {import.meta.env.DEV && <TanStackRouterDevtools />}
      </>
    );
  }

  return (
    <Layout>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </Layout>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});
