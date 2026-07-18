import { createFileRoute, useNavigate } from "@tanstack/react-router";
import GuestBookPage from "@/pages/guestBook/GuestBookPage";

export const Route = createFileRoute("/_authenticated/spaces/$spaceId/guestbook")({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <GuestBookPage
      spaceId={spaceId}
      onBack={() => navigate({ to: ".." })}
      onCardClick={(guestbookId) =>
        navigate({
          to: "/new-guestbook/$guestbookId",
          params: { guestbookId: String(guestbookId) },
        })
      }
      onNewStackClick={() => navigate({ to: "/new-guestbooks" })}
    />
  );
}
