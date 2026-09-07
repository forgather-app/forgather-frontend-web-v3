import { createFileRoute, useNavigate } from "@tanstack/react-router";
import useFlowBack from "@/hooks/@common/useFlowBack";
import ArtworkDetailPage from "@/pages/artworkDetail/ArtworkDetailPage";

export const Route = createFileRoute(
  "/_appOnly/_authenticated/spaces/$spaceId/artworks/$artworkId/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId, artworkId } = Route.useParams();
  const navigate = useNavigate();
  const flowBack = useFlowBack();

  return (
    <ArtworkDetailPage
      spaceId={spaceId}
      artworkId={Number(artworkId)}
      onBack={() => flowBack({ to: "/spaces/$spaceId", params: { spaceId } })}
      onEditClick={() =>
        navigate({
          to: "/spaces/$spaceId/artworks/$artworkId/edit",
          params: { spaceId, artworkId },
        })
      }
      onDeleteSuccess={() =>
        navigate({ to: "/spaces/$spaceId", params: { spaceId }, replace: true })
      }
    />
  );
}
