import { createFileRoute, Outlet } from "@tanstack/react-router";
import { appOnlyBeforeLoad } from "@/utils/appOnlyGuard";

// 방문자용 방명록 작성 페이지(src/routes/spaces/$spaceId/guestbook/write.tsx)는
// 앱 미설치 방문자도 접근해야 하므로 이 레이아웃 밖에 둔다.
export const Route = createFileRoute("/_appOnly")({
  beforeLoad: appOnlyBeforeLoad,
  component: () => <Outlet />,
});
