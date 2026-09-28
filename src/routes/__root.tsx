import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout/Layout";
import NotFoundPage from "@/pages/notFound/NotFoundPage";
import { capturePageview } from "@/utils/analytics";

// 랜딩 페이지만 전체 화면으로 보여주고, 그 외 페이지는 공통 레이아웃을 적용한다
const FULL_WIDTH_PATHS = ["/landing"];

const RootComponent = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isFullWidthPage = FULL_WIDTH_PATHS.some((path) =>
    pathname.startsWith(path),
  );

  // NOTE: TanStack Router는 SPA 라우팅이라 페이지 이동 시 전체 새로고침이 없어
  // PostHog의 기본 pageview 자동 캡처(브라우저 네비게이션 감지)가 동작하지 않는다.
  useEffect(() => {
    capturePageview(pathname);
  }, [pathname]);

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
