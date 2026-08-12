import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ArtworkDetailPage from "@/pages/artworkDetail/ArtworkDetailPage";

export const Route = createFileRoute("/_authenticated/artworks/$artworkId")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <ArtworkDetailPage
      onBack={() => navigate({ to: ".." })}
      // TODO: 수정하기/삭제하기 드롭다운 메뉴 연동
      onMenuClick={() => {}}
    />
  );
}
