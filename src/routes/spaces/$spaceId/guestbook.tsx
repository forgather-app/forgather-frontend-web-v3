import { createFileRoute, useNavigate } from "@tanstack/react-router";
import GuestBookPage from "@/pages/guestBook/GuestBookPage";

export const Route = createFileRoute("/spaces/$spaceId/guestbook")({
  component: RouteComponent,
});

function RouteComponent() {
  const { spaceId } = Route.useParams();
  const navigate = useNavigate();

  return (
    <GuestBookPage spaceId={spaceId} onBack={() => navigate({ to: ".." })} />
  );
}
