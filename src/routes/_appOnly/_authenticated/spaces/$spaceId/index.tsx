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
      // TODO: 전시 정보 수정 페이지 이동 연동
      onEditClick={() => {}}
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
