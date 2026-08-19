import { createFileRoute, useNavigate } from "@tanstack/react-router";
import GuestGuestBookPage from "@/pages/guestGuestBook/GuestGuestBookPage";

export const Route = createFileRoute("/spaces/$spaceId/guest/guestbook/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <GuestGuestBookPage
      spaceId={spaceId}
      onCardClick={(guestbookId) =>
        navigate({
          to: "/spaces/$spaceId/guest/guestbook/$guestbookId",
          params: { spaceId, guestbookId: String(guestbookId) },
        })
      }
    />
  );
}
