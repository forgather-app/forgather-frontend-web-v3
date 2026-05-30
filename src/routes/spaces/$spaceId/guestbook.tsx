import { createFileRoute } from "@tanstack/react-router";
import GuestBookPage from "@/pages/guestBook/GuestBookPage";

export const Route = createFileRoute("/spaces/$spaceId/guestbook")({
  component: RouteComponent,
});

function RouteComponent() {
  return <GuestBookPage />;
}
