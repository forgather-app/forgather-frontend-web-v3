import { createFileRoute, useNavigate } from "@tanstack/react-router";
import EditArtworkPage from "@/pages/editArtwork/EditArtworkPage";

export const Route = createFileRoute(
  "/_appOnly/_authenticated/spaces/$spaceId/artworks/$artworkId/edit",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId, artworkId } = Route.useParams();
  const navigate = useNavigate();

  const goToDetail = () =>
    navigate({
      to: "/spaces/$spaceId/artworks/$artworkId",
      params: { spaceId, artworkId },
    });

  return (
    <EditArtworkPage
      spaceId={spaceId}
      artworkId={Number(artworkId)}
      onBack={goToDetail}
      onSuccess={goToDetail}
    />
  );
}
