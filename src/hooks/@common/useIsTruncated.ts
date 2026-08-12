import { useLayoutEffect, useRef, useState } from "react";

/**
 * NOTE: line-clamp 등으로 잘리는 텍스트 요소가 실제로 잘렸는지(overflow) 감지
 */
export const useIsTruncated = <T extends HTMLElement>(deps: unknown[]) => {
  const ref = useRef<T>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // DOM 레이아웃(scrollHeight)을 읽어야만 알 수 있는 값이라 렌더 중 계산이 불가능함
    setIsTruncated(el.scrollHeight > el.clientHeight);
    // biome-ignore lint/correctness/useExhaustiveDependencies: deps는 호출부에서 텍스트 내용 등으로 직접 전달받음
  }, deps);

  return { ref, isTruncated };
};
