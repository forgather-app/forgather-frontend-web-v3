import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense } from "react";
import GuestBookPage from "@/pages/guestBook/GuestBookPage";

export const Route = createFileRoute(
  "/_authenticated/spaces/$spaceId/guestbook/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <Suspense fallback={null}>
      <GuestBookPage
        spaceId={spaceId}
        onBack={() => navigate({ to: ".." })}
        onCardClick={(guestbookId) =>
          navigate({
            to: "/spaces/$spaceId/guestbook/$guestbookId",
            params: { spaceId, guestbookId: String(guestbookId) },
          })
        }
        onNewStackClick={() => navigate({ to: "/new-guestbooks" })}
      />
    </Suspense>
  );
}
