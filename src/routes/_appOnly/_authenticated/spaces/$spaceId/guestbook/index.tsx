import { createFileRoute, useNavigate } from "@tanstack/react-router";
import GuestBookPage from "@/pages/guestBook/GuestBookPage";

export const Route = createFileRoute(
  "/_appOnly/_authenticated/spaces/$spaceId/guestbook/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <GuestBookPage
      spaceId={spaceId}
      onCardClick={(guestbookId) =>
        navigate({
          to: "/spaces/$spaceId/guestbook/$guestbookId",
          params: { spaceId, guestbookId: String(guestbookId) },
        })
      }
    />
  );
}
