import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ArtworkPage from "@/pages/artwork/ArtworkPage";

export const Route = createFileRoute("/_authenticated/spaces/$spaceId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <ArtworkPage
      spaceId={spaceId}
      onAddArtworkClick={() => navigate({ to: "/create-product" })}
      onArtworkClick={(artworkId) =>
        navigate({
          to: "/spaces/$spaceId/artworks/$artworkId",
          params: { spaceId, artworkId: String(artworkId) },
        })
      }
    />
  );
}
