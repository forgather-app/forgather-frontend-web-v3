import {
  createFileRoute,
  Outlet,
  useMatches,
  useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";
import { useGetSpaceInformation } from "@/api/generated/space-스페이스";
import type { ApiResponseSpaceResponse, SpaceResponse } from "@/api/model";
import QrBottomSheetContent from "@/components/UI/QrBottomSheetContent/QrBottomSheetContent";
import ShareModal from "@/components/UI/ShareModal/ShareModal";
import useKakaoShareBridge from "@/hooks/@common/useKakaoShareBridge";
import useSnackBar from "@/hooks/@common/useSnackBar";
import SpaceLayout from "@/pages/space/SpaceLayout";

export const Route = createFileRoute(
  "/_appOnly/_authenticated/spaces/$spaceId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();
  const { requestKakaoShare } = useKakaoShareBridge();
  const { data: space } = useGetSpaceInformation<SpaceResponse>(spaceId, {
    query: {
      select: (response) =>
        (response as unknown as ApiResponseSpaceResponse).data ?? {},
    },
  });
  const matches = useMatches();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isQrSheetOpen, setIsQrSheetOpen] = useState(false);
  const isGuestBookTab = matches.some(
    (match) =>
      match.routeId === "/_appOnly/_authenticated/spaces/$spaceId/guestbook/",
  );
  const isDetailRoute = matches.some(
    (match) =>
      match.routeId ===
        "/_appOnly/_authenticated/spaces/$spaceId/artworks/$artworkId" ||
      match.routeId ===
        "/_appOnly/_authenticated/spaces/$spaceId/guestbook/$guestbookId" ||
      match.routeId ===
        "/_appOnly/_authenticated/spaces/$spaceId/create-product/" ||
      match.routeId === "/_appOnly/_authenticated/spaces/$spaceId/edit/",
  );

  if (isDetailRoute) {
    return <Outlet />;
  }

  const writeUrl = `${window.location.origin}/spaces/${spaceId}/guest`;

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
        onKakaoShare={() => {
          requestKakaoShare({
            title: `${space?.name ?? ""} | Forgather`,
            description: "스페이스에 초대되었습니다",
            link: writeUrl,
            buttonTitle: "방명록 남기기",
          });
          setIsShareModalOpen(false);
        }}
        onCopyLink={async () => {
          await navigator.clipboard.writeText(writeUrl);
          showSnackBar("링크가 클립보드에 복사되었습니다.", "default");
          setIsShareModalOpen(false);
        }}
        onSaveQr={() => {
          setIsShareModalOpen(false);
          setIsQrSheetOpen(true);
        }}
      />

      {isQrSheetOpen && (
        <QrBottomSheetContent
          isOpen={isQrSheetOpen}
          onClose={() => setIsQrSheetOpen(false)}
          qrValue={writeUrl}
        />
      )}
    </>
  );
}
