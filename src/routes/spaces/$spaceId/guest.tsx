import {
  createFileRoute,
  Outlet,
  useMatches,
  useNavigate,
} from "@tanstack/react-router";
import GuestSpaceLayout from "@/pages/guestSpace/GuestSpaceLayout";

export const Route = createFileRoute("/spaces/$spaceId/guest")({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const navigate = useNavigate();
  const matches = useMatches();

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
