import { createFileRoute, useNavigate } from "@tanstack/react-router";
import MyPage from "@/pages/myPage/MyPage";

export const Route = createFileRoute("/_authenticated/my-page/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  return (
    <MyPage
      onBack={() => navigate({ to: ".." })}
      onEditProfile={() => navigate({ to: "/my-page/edit" })}
      onTermsClick={() => {
        // TODO : 이용약관 페이지 연결
      }}
      onLogout={() => {
        // TODO: 로그아웃 API 연동 시 연결
      }}
      onInquiryClick={() => {
        // TODO: 문의 채널 확정 시 연결
      }}
      onWithdraw={() => {
        // TODO: 탈퇴 플로우 확정 시 연결
      }}
    />
  );
}
