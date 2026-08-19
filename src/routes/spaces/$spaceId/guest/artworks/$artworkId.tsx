import { createFileRoute, useNavigate } from "@tanstack/react-router";
import GuestArtworkDetailPage from "@/pages/guestArtworkDetail/GuestArtworkDetailPage";

export const Route = createFileRoute(
  "/spaces/$spaceId/guest/artworks/$artworkId",
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId, artworkId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <GuestArtworkDetailPage
      spaceId={spaceId}
      artworkId={Number(artworkId)}
      onBack={() =>
        navigate({ to: "/spaces/$spaceId/guest", params: { spaceId } })
      }
      onWriteClick={() =>
        navigate({
          to: "/spaces/$spaceId/guest/guestbook/write",
          params: { spaceId },
        })
      }
    />
  );
}
