import {
  createFileRoute,
  Outlet,
  useMatches,
  useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";
import ShareModal from "@/components/UI/ShareModal/ShareModal";
import useSnackBar from "@/hooks/@common/useSnackBar";
import SpaceLayout from "@/pages/space/SpaceLayout";

export const Route = createFileRoute("/_authenticated/spaces/$spaceId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();
  const matches = useMatches();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const isGuestBookTab = matches.some(
    (match) => match.routeId === "/_authenticated/spaces/$spaceId/guestbook/",
  );
  const isDetailRoute = matches.some(
    (match) =>
      match.routeId === "/_authenticated/spaces/$spaceId/artworks/$artworkId" ||
      match.routeId ===
        "/_authenticated/spaces/$spaceId/guestbook/$guestbookId",
  );

  if (isDetailRoute) {
    return <Outlet />;
  }

  return (
    <>
      <SpaceLayout
        activeTab={isGuestBookTab ? "right" : "left"}
        onBack={() => navigate({ to: "/home" })}
        onArtworkTabClick={() =>
          navigate({
            to: "/spaces/$spaceId",
            params: { spaceId },
            replace: true,
          })
        }
        onGuestBookTabClick={() =>
          navigate({
            to: "/spaces/$spaceId/guestbook",
            params: { spaceId },
            replace: true,
          })
        }
        onShareClick={() => setIsShareModalOpen(true)}
      >
        <Outlet />
      </SpaceLayout>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onCopyLink={async () => {
          const writeUrl = `${window.location.origin}/spaces/${spaceId}/guestbook/write`;
          await navigator.clipboard.writeText(writeUrl);
          showSnackBar("링크가 클립보드에 복사되었습니다.", "default");
          setIsShareModalOpen(false);
        }}
      />
    </>
  );
}
