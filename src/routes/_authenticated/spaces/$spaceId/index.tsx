import { createFileRoute } from "@tanstack/react-router";
import ArtworkPage from "@/pages/artwork/ArtworkPage";

export const Route = createFileRoute("/_authenticated/spaces/$spaceId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();

  return <ArtworkPage spaceId={spaceId} />;
}
