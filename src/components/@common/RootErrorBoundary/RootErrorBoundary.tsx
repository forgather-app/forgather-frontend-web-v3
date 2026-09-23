import { isNotFound, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import useErrorModal from "@/hooks/@common/useErrorModal";
import { isGuestFlow } from "@/utils/isGuestFlow";

interface RootErrorBoundaryProps {
  /** 라우터가 이 컴포넌트를 errorComponent로 렌더링할 때 넘겨주는 실제 에러 */
  error?: unknown;
}

const RootErrorBoundary = ({ error }: RootErrorBoundaryProps) => {
  const router = useRouter();
  const { openErrorModal } = useErrorModal();

  // NOTE: notFound()는 이 경계가 처리할 대상이 아니다. 렌더링 중(useEffect 이전) 바로
  // 다시 던져서, 상위 라우트의 notFoundComponent(CatchNotFound 경계)가 잡을 수 있도록
  // 그대로 통과시킨다. 여기서 걸러내지 않으면 아래 useEffect가 먼저 실행되어 "이전 경로로
  // 이동 + 모달"이 notFound 케이스에도 적용돼버린다.
  if (isNotFound(error)) throw error;

  // biome-ignore lint/correctness/useExhaustiveDependencies: 마운트 시 1회만 실행
  useEffect(() => {
    // NOTE: 게스트 flow(_appOnly 밖)는 "/"가 안전하지 않다 — _appOnly/_authenticated의
    // 인증 가드에 걸려 로그인 리다이렉트로 빠진다. 그리고 index 라우트(예:
    // /spaces/$spaceId/guest)에서는 ".."가 어디로 계산될지도 신뢰하기 어렵다(실측 결과
    // 라우트 트리 기준 예상과 다르게 계산됨). 그래서 게스트 flow는 항상 가드 없는
    // /landing으로 보낸다. 호스트(_appOnly, 로그인된 상태)는 기존 그대로 ".."를 쓴다.
    router.navigate({
      to: isGuestFlow(router.state.matches) ? "/landing" : "..",
      replace: true,
    });
    openErrorModal();
  }, []);

  return null;
};

export default RootErrorBoundary;
