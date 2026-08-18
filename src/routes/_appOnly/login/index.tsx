import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useGetCurrentUser } from "@/api/generated/auth-인증";
import type { ApiResponseHostResponse } from "@/api/model";
import LoginPage from "@/pages/login/LoginPage";

interface LoginSearch {
  /** 로그인 성공 후 돌아갈 경로 (오픈 리다이렉트 방지를 위해 내부 경로만 허용) */
  redirectTo?: string;
}

export const Route = createFileRoute("/_appOnly/login/")({
  validateSearch: (search: Record<string, unknown>): LoginSearch => {
    const { redirectTo } = search;
    if (
      typeof redirectTo === "string" &&
      redirectTo.startsWith("/") &&
      !redirectTo.startsWith("//")
    ) {
      return { redirectTo };
    }
    return {};
  },
  component: LoginRouteGuard,
});

// NOTE: /login은 _authenticated 그룹 밖의 독립 라우트라 인증 상태를 체크하지 않음.
// 이미 로그인된 사용자가 뒤로가기/딥링크 등으로 /login에 진입해도 그대로 로그인 화면이
// 노출되던 문제가 있어, 여기서 직접 인증 여부를 확인해 이미 로그인된 사용자는 돌려보낸다.
function LoginRouteGuard() {
  const navigate = useNavigate();
  const { redirectTo } = Route.useSearch();
  const { data, isError, isPending } = useGetCurrentUser({
    query: { retry: false },
  });
  const onboardingCompleted = (data as unknown as ApiResponseHostResponse)?.data
    ?.onboardingCompleted;

  useEffect(() => {
    if (isPending || isError) return;
    if (onboardingCompleted) {
      navigate({ href: redirectTo ?? "/home" });
      return;
    }
    navigate({ to: "/sign-up" });
  }, [isPending, isError, onboardingCompleted, navigate, redirectTo]);

  if (isPending || !isError) return null;

  return <LoginPage />;
}
