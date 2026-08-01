import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Suspense } from "react";
import ArtworkPage from "@/pages/artwork/ArtworkPage";

export const Route = createFileRoute("/_authenticated/spaces/$spaceId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <Suspense fallback={null}>
      <ArtworkPage
        onBack={() => navigate({ to: "/home" })}
        onGuestBookTabClick={() =>
          navigate({ to: "/spaces/$spaceId/guestbook", params: { spaceId } })
        }
      />
    </Suspense>
  );
}
