import {
  createFileRoute,
  Outlet,
  useLocation,
  useMatches,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useGetCurrentUser } from "@/api/generated/auth-인증";
import type { ApiResponseHostResponse } from "@/api/model";
import useSnackBar from "@/hooks/@common/useSnackBar";

export const Route = createFileRoute("/_appOnly/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showSnackBar } = useSnackBar();
  const isSignUpRoute = useMatches().some(
    (match) => match.routeId === "/_appOnly/_authenticated/sign-up/",
  );

  // NOTE: 인증 토큰이 서버 쿠키로 발급되어 클라이언트에서 로그인 여부를 직접 읽을 수 없으므로,
  // BE 스펙상 응답 content-type이 `*/*`라 orval이 Blob으로 잘못 추론함.
  // 실제 응답 바디는 ApiResponseHostResponse (JSON)이므로 캐스팅해서 사용
  // TODO: MyPage/ProfileEditPage/HomePage 등에서 useGetProfile을 각자 호출 중 —
  // 소비처가 더 늘어나면 이 레이아웃에서 프로필까지 fetch해 Context로 내려주는 방식 고려
  const { data, isError, isPending } = useGetCurrentUser({
    query: { enabled: !isSignUpRoute, retry: false },
  });
  const onboardingCompleted = (data as unknown as ApiResponseHostResponse)?.data
    ?.onboardingCompleted;

  // NOTE: location.href를 deps에 넣으면 navigate() 호출이 location을 바꾸고,
  // 그게 다시 effect를 재실행시켜 redirectTo가 자기 자신을 감싸며 무한 navigate되는
  // 루프가 생긴다. 최신 값만 읽고 deps에서는 제외한다.
  // biome-ignore lint/correctness/useExhaustiveDependencies: location.href를 deps에 넣으면 navigate가 재귀적으로 트리거되는 루프가 생김
  useEffect(() => {
    if (isSignUpRoute) return;
    if (isError) {
      showSnackBar("세션이 만료되었어요. 다시 로그인해주세요.", "error");
      navigate({
        to: "/login",
        search: { redirectTo: location.href },
      });
      return;
    }
    if (!isPending && !onboardingCompleted) {
      navigate({ to: "/sign-up" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
