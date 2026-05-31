import { useState } from "react";

interface UseFunnelProps<T extends readonly string[], D> {
  /** 퍼널 step 목록 (`as const` 배열) */
  steps: T;
  /** 전체 step 데이터 초기값 (타입 추론에도 사용됨) */
  initialData: D;
}

/**
 * 단계별 입력 플로우(퍼널)를 관리하는 훅.
 * step 이동과 step별 데이터 누적을 타입 안전하게 처리합니다.
 *
 * @template T - step 이름 목록 (readonly string 배열, `as const` 필수)
 * @template D - step 이름을 키로 갖는 데이터 타입 맵
 *
 * @example
 * const STEPS = ["image", "info"] as const;
 * type Data = { image: { file: File }; info: { title: string } };
 *
 * const { currentStep, onNext, onPrev, data } = useFunnel<typeof STEPS, Data>({
 *   steps: STEPS,
 *   initialData: { image: { file: null }, info: { title: "" } },
 * });
 */
const useFunnel = <
  T extends readonly string[],
  // NOTE: 각 step 별 data 타입을 전달하도록 강제한다
  D extends Record<T[number], unknown>,
>({
  steps,
  initialData,
}: UseFunnelProps<T, D>) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [data, setData] = useState<Partial<D>>(initialData);

  /** 현재 step의 데이터를 누적 갱신합니다 */
  const updateData = (newData: D[T[number]]) => {
    setData((prev) => ({
      ...prev,
      [steps[currentStepIndex]]: newData,
    }));
  };

  /** 이전 step으로 이동합니다. 첫 번째 step에서는 이동하지 않습니다 */
  const onPrev = () => {
    setCurrentStepIndex((prev) => (prev <= 0 ? prev : prev - 1));
  };

  /** 현재 step 데이터를 저장하고 다음 step으로 이동합니다. 마지막 step에서는 이동하지 않습니다 */
  const onNext = (newData: D[T[number]]) => {
    setCurrentStepIndex((prev) => (prev >= steps.length - 1 ? prev : prev + 1));
    updateData(newData);
  };

  return { currentStepIndex, onPrev, onNext, data };
};

export default useFunnel;
