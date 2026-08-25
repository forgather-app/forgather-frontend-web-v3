import { useEffect, useState } from "react";
import { CONSTRAINTS } from "@/constants/constraints";

/**
 * 로딩 상태가 일정 시간(`delayMs`) 이상 유지될 때만 true를 반환하는 훅.
 *
 * 응답이 빨리 끝나 스켈레톤 UI가 뜨자마자 사라지는 깜빡임을 방지하기 위해 사용합니다.
 * `isLoading`이 `delayMs` 안에 false로 바뀌면 한 번도 true를 반환하지 않습니다.
 *
 * @param isLoading - 실제 로딩 상태
 * @param delayMs - 스켈레톤을 표시하기까지 대기할 시간(ms). 기본값 `CONSTRAINTS.SKELETON_LOADING_DELAY`
 */
const useDelayedLoading = (
  isLoading: boolean,
  delayMs: number = CONSTRAINTS.SKELETON_LOADING_DELAY,
) => {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setShowLoading(false);
      return;
    }

    const timer = setTimeout(() => setShowLoading(true), delayMs);
    return () => clearTimeout(timer);
  }, [isLoading, delayMs]);

  return showLoading;
};

export default useDelayedLoading;
