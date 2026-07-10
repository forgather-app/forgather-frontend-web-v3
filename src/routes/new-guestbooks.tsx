import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/new-guestbooks")({
  component: RouteComponent,
});

function RouteComponent() {
  // TODO: 새 방명록 목록 페이지 구현
  return <div>새 방명록 목록</div>;
}
