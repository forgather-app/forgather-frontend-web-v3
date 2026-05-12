import { useEffect, useRef, useState } from "react";
import { CONSTRAINTS } from "@/constants/constraints";
import useDisclosure from "@/hooks/@common/useDisclosure";
import useDragToClose from "@/hooks/@common/useDragToClose";
import * as S from "./SnackBar.styles";

/**
 * 3초 후 자동으로 닫히며, 좌우 스와이프로도 닫을 수 있는 스낵바.
 *
 * `IconType`에 따라 왼쪽에 아이콘 영역이 표시됩니다.
 * - `'alert'`: 체크 아이콘 (정보/성공 상태)
 * - `'error'`: 경고 아이콘 (에러 상태)
 * - `undefined`: 아이콘 없음
 *
 * 부모에서 `{show && <SnackBar onClose={...} />}` 패턴으로 마운트/언마운트합니다.
 */
interface SnackBarProps {
  /** 닫힘 애니메이션 종료 후 호출되는 콜백. 부모에서 컴포넌트를 언마운트합니다. */
  onClose: () => void;
  /** 스낵바에 표시할 메시지 */
  message: string;
  /** 아이콘 타입. 'alert'는 체크 아이콘, 'error'는 경고 아이콘, undefined면 아이콘 없음 */
  IconType?: "alert" | "error";
}

const SnackBar = ({ onClose, message, IconType }: SnackBarProps) => {
  const snackBarRef = useRef<HTMLDivElement | null>(null);
  const [isDissolving, setIsDissolving] = useState(false);
  const { isVisible, hideSheet, alertAnimationEnd } = useDisclosure({
    isOpen: true,
    onClose,
  });

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handlePointerCancel,
  } = useDragToClose({
    elementRef: snackBarRef,
    onDismiss: hideSheet,
    threshold: CONSTRAINTS.SNACKBAR_CLOSE_THRESHOLD,
    direction: "horizontal",
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: 스낵바 마운트 시 1회만 타이머 설정
  useEffect(() => {
    const timer = setTimeout(hideSheet, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseButton = () => {
    setIsDissolving(true);
    hideSheet();
  };

  return (
    <S.Wrapper
      ref={snackBarRef}
      $isVisible={isVisible}
      $hasIcon={!!IconType}
      $isDissolving={isDissolving}
      onAnimationEnd={alertAnimationEnd}
      onTransitionEnd={alertAnimationEnd}
      onPointerDown={handleMouseDown}
      onPointerMove={handleMouseMove}
      onPointerUp={handleMouseUp}
      onPointerCancel={handlePointerCancel}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <S.Content>
        {IconType && (
          <S.IconArea aria-hidden="true">
            {/* TODO: [Icon] - IconType에 따른 아이콘 구현 필요 (alert: 체크, error: 경고) */}
          </S.IconArea>
        )}
        <S.Message>{message}</S.Message>
      </S.Content>
      <S.CloseButton type="button" onClick={handleCloseButton} aria-label="스낵바 닫기">
        {/* TODO: [CloseIcon] - X 닫기 아이콘 구현 필요 */}
      </S.CloseButton>
    </S.Wrapper>
  );
};

export default SnackBar;
