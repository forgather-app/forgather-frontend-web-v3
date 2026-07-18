import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/new-guestbook/$guestbookId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { guestbookId } = Route.useParams();
  // TODO: 방명록 개별 View 구현
  return <div>guestbook {guestbookId}</div>;
}
