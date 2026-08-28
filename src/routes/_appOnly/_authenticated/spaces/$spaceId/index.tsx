import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ArtworkPage from "@/pages/artwork/ArtworkPage";

export const Route = createFileRoute(
  "/_appOnly/_authenticated/spaces/$spaceId/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <ArtworkPage
      spaceId={spaceId}
      onEditClick={() =>
        navigate({ to: "/spaces/$spaceId/edit", params: { spaceId } })
      }
      onDeleteSuccess={() => navigate({ to: "/home" })}
      onAddArtworkClick={() =>
        navigate({ to: "/spaces/$spaceId/create-product", params: { spaceId } })
      }
      onArtworkClick={(artworkId) =>
        navigate({
          to: "/spaces/$spaceId/artworks/$artworkId",
          params: { spaceId, artworkId: String(artworkId) },
        })
      }
    />
  );
}
