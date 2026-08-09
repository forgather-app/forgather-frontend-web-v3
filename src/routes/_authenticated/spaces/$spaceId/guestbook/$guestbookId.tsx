import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense } from "react";
import GuestbookDetailPage from "@/pages/guestbookDetail/GuestbookDetailPage";

export const Route = createFileRoute(
  "/_authenticated/spaces/$spaceId/guestbook/$guestbookId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId, guestbookId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <Suspense fallback={null}>
      <GuestbookDetailPage
        spaceId={spaceId}
        currentId={Number(guestbookId)}
        onBack={() =>
          navigate({ to: "/spaces/$spaceId/guestbook", params: { spaceId } })
        }
        onNavigate={(id) =>
          navigate({
            to: "/spaces/$spaceId/guestbook/$guestbookId",
            params: { spaceId, guestbookId: String(id) },
            replace: true,
          })
        }
      />
    </Suspense>
  );
}
