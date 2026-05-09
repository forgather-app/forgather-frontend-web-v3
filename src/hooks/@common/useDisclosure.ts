import { useState } from "react";

/**
 * 닫힘 애니메이션이 끝난 뒤 `onClose`를 호출하는 열림/닫힘 상태 관리 훅.
 *
 * `isVisible`로 닫힘 애니메이션을 트리거하고, 애니메이션이 끝나면(`alertAnimationEnd`)
 * `onClose`를 호출해 부모가 컴포넌트를 언마운트하도록 합니다.
 * `{isOpen && <Component />}` 패턴으로 마운트/언마운트하는 컴포넌트를 전제합니다.
 *
 * @param props.isOpen - 마운트 시 초기 열림 상태 (항상 true로 마운트됨)
 * @param props.onClose - 닫힘 애니메이션 종료 후 호출되는 콜백
 */
interface UseDisclosureProps {
  /** 마운트 시 초기 열림 상태 (항상 true로 마운트됨) */
  isOpen: boolean;
  /** 닫힘 애니메이션 종료 후 호출되는 콜백. 부모에서 컴포넌트를 언마운트합니다. */
  onClose: () => void;
}

const useDisclosure = ({ isOpen, onClose }: UseDisclosureProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  const hideSheet = () => {
    setIsVisible(false);
  };

  const alertAnimationEnd = () => {
    // NOTE: 바텀시트가 꺼질 떄만 동작
    if (!isVisible) {
      onClose();
    }
  };

  return { isVisible, hideSheet, alertAnimationEnd };
};

export default useDisclosure;
