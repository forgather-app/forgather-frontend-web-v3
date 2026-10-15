import {
  createFileRoute,
  Outlet,
  useMatches,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useGetSpaceInformation } from "@/api/generated/space-스페이스";
import type { ApiResponseSpaceResponse, SpaceResponse } from "@/api/model";
import GuestSpaceLayout from "@/pages/guestSpace/GuestSpaceLayout";
import NotFoundPage from "@/pages/notFound/NotFoundPage";
import { trackEvent } from "@/utils/analytics";

export const Route = createFileRoute("/spaces/$spaceId/guest")({
  component: RouteComponent,
  notFoundComponent: NotFoundPage,
});

// TODO: 리팩토링 필요 — useGetSpaceInformation 호출과 space_viewed 트래킹이 호스트 쪽
// $spaceId.tsx에도 거의 동일하게 중복되어 있다. 공용 훅(예: useSpaceViewTracking)으로
// 추출해 두 라우트가 공유하도록 정리하는 방향 검토
function RouteComponent() {
  const { spaceId } = Route.useParams();
  const navigate = useNavigate();
  const matches = useMatches();
  const { data: space } = useGetSpaceInformation<SpaceResponse>(spaceId, {
    query: {
      select: (response) =>
        (response as unknown as ApiResponseSpaceResponse).data ?? {},
    },
  });

  useEffect(() => {
    if (!space?.name) return;
    trackEvent("space_viewed", {
      space_id: spaceId,
      space_name: space.name,
      viewer_role: "guest",
    });
  }, [spaceId, space?.name]);

  const isGuestBookTab = matches.some(
    (match) => match.routeId === "/spaces/$spaceId/guest/guestbook/",
  );
  // 작품/방명록 상세와 방명록 작성 페이지는 상단 탭·하단 CTA 없이 전체 화면을 차지하므로 레이아웃을 건너뛴다
  const isFullPageRoute = matches.some(
    (match) =>
      match.routeId === "/spaces/$spaceId/guest/artworks/$artworkId" ||
      match.routeId === "/spaces/$spaceId/guest/guestbook/$guestbookId" ||
      match.routeId === "/spaces/$spaceId/guest/guestbook/write",
  );
  if (isFullPageRoute) {
    return <Outlet />;
  }

  return (
    <GuestSpaceLayout
      activeTab={isGuestBookTab ? "right" : "left"}
      onArtworkTabClick={() =>
        navigate({
          to: "/spaces/$spaceId/guest",
          params: { spaceId },
          replace: true,
        })
      }
      onGuestBookTabClick={() =>
        navigate({
          to: "/spaces/$spaceId/guest/guestbook",
          params: { spaceId },
          replace: true,
        })
      }
      onWriteClick={() =>
        navigate({
          to: "/spaces/$spaceId/guest/guestbook/write",
          params: { spaceId },
        })
      }
    >
      <Outlet />
    </GuestSpaceLayout>
  );
}
