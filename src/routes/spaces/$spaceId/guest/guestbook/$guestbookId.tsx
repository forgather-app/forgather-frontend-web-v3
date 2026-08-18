import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense } from "react";
import GuestGuestbookDetailPage from "@/pages/guestGuestbookDetail/GuestGuestbookDetailPage";

export const Route = createFileRoute(
  "/spaces/$spaceId/guest/guestbook/$guestbookId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId, guestbookId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <Suspense fallback={null}>
      <GuestGuestbookDetailPage
        spaceId={spaceId}
        currentId={Number(guestbookId)}
        onBack={() =>
          navigate({
            to: "/spaces/$spaceId/guest/guestbook",
            params: { spaceId },
          })
        }
        onNavigate={(id) =>
          navigate({
            to: "/spaces/$spaceId/guest/guestbook/$guestbookId",
            params: { spaceId, guestbookId: String(id) },
            replace: true,
          })
        }
      />
    </Suspense>
  );
}
