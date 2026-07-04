import { createFileRoute, useNavigate } from "@tanstack/react-router";
import CreateSpaceCompletePage from "@/pages/createSpace/CreateSpaceCompletePage";

export const Route = createFileRoute("/create-space/complete")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <CreateSpaceCompletePage
      // TODO: 스페이스 상세 라우트 추가 시 생성된 spaceId 경로로 교체
      onNavigateToSpace={() => navigate({ to: "/" })}
    />
  );
}
