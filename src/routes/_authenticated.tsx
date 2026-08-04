import {
  createFileRoute,
  Outlet,
  useMatches,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useGetCurrentUser } from "@/api/generated/auth-인증";
import type { ApiResponseHostResponse } from "@/api/model";
import useSnackBar from "@/hooks/@common/useSnackBar";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();
  const isSignUpRoute = useMatches().some(
    (match) => match.routeId === "/_authenticated/sign-up/",
  );

  // NOTE: 인증 토큰이 서버 쿠키로 발급되어 클라이언트에서 로그인 여부를 직접 읽을 수 없으므로,
  // BE 스펙상 응답 content-type이 `*/*`라 orval이 Blob으로 잘못 추론함.
  // 실제 응답 바디는 ApiResponseHostResponse (JSON)이므로 캐스팅해서 사용
  const { data, isError, isPending } = useGetCurrentUser({
    query: { enabled: !isSignUpRoute, retry: false },
  });
  const onboardingCompleted = (data as unknown as ApiResponseHostResponse)?.data
    ?.onboardingCompleted;

  useEffect(() => {
    if (isSignUpRoute) return;
    if (isError) {
      showSnackBar("세션이 만료되었어요. 다시 로그인해주세요.", "error");
      navigate({ to: "/login" });
      return;
    }
    if (!isPending && !onboardingCompleted) {
      navigate({ to: "/sign-up" });
    }
  }, [
    isError,
    isPending,
    onboardingCompleted,
    isSignUpRoute,
    navigate,
    showSnackBar,
  ]);

  const isAuthorized =
    isSignUpRoute || (!isError && !isPending && onboardingCompleted);
  if (!isAuthorized) return null;

  return <Outlet />;
}
