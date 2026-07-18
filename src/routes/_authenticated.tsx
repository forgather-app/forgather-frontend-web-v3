import {
  createFileRoute,
  Outlet,
  useMatches,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { getAccessToken } from "@/api/authToken";
import { useGetCurrentUser } from "@/api/generated/auth-인증";
import type { ApiResponseHostResponse } from "@/api/model";
import useSnackBar from "@/hooks/@common/useSnackBar";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();
  const accessToken = getAccessToken();
  const isSignUpRoute = useMatches().some(
    (match) => match.routeId === "/_authenticated/sign-up/",
  );

  // NOTE: BE 스펙상 응답 content-type이 `*/*`라 orval이 Blob으로 잘못 추론함.
  // 실제 응답 바디는 ApiResponseHostResponse (JSON)이므로 캐스팅해서 사용
  const { data, isError, isPending } = useGetCurrentUser({
    query: { enabled: !!accessToken, retry: false },
  });
  const onboardingCompleted = (data as unknown as ApiResponseHostResponse)?.data
    ?.onboardingCompleted;

  useEffect(() => {
    if (!accessToken) {
      navigate({ to: "/login" });
      return;
    }
    if (isError) {
      showSnackBar("세션이 만료되었어요. 다시 로그인해주세요.", "error");
      navigate({ to: "/login" });
      return;
    }
    if (!isPending && !onboardingCompleted && !isSignUpRoute) {
      navigate({ to: "/sign-up" });
    }
  }, [
    accessToken,
    isError,
    isPending,
    onboardingCompleted,
    isSignUpRoute,
    navigate,
    showSnackBar,
  ]);

  const isAuthorized =
    !!accessToken &&
    !isError &&
    !isPending &&
    (onboardingCompleted || isSignUpRoute);
  if (!isAuthorized) return null;

  return <Outlet />;
}
