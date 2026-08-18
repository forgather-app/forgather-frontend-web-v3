import { createFileRoute, useNavigate } from "@tanstack/react-router";
import GuestArtworkPage from "@/pages/guestSpace/GuestArtworkPage";

export const Route = createFileRoute("/spaces/$spaceId/guest/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <GuestArtworkPage
      spaceId={spaceId}
      onArtworkClick={(artworkId) =>
        navigate({
          to: "/spaces/$spaceId/guest/artworks/$artworkId",
          params: { spaceId, artworkId: String(artworkId) },
        })
      }
    />
  );
}
