import { type JSX, useEffect, useRef, useState } from "react";
import IcAlert from "@/assets/icons/ic_alert.svg?react";
import IcCheck from "@/assets/icons/ic_check.svg?react";
import IcClose from "@/assets/icons/ic_close.svg?react";
import { CONSTRAINTS } from "@/constants/constraints";
import useDisclosure from "@/hooks/@common/useDisclosure";
import useDragToClose from "@/hooks/@common/useDragToClose";
import { theme } from "@/styles/theme";
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

type IconType = "alert" | "error";
interface SnackBarProps {
  /** 닫힘 애니메이션 종료 후 호출되는 콜백. 부모에서 컴포넌트를 언마운트합니다. */
  onClose: () => void;
  /** 스낵바에 표시할 메시지 */
  message: string;
  /** 아이콘 타입. 'alert'는 체크 아이콘, 'error'는 경고 아이콘, undefined면 아이콘 없음 */
  iconType?: IconType;
}

const ICON = {
  alert: (
    <IcCheck width={24} height={24} color={theme.colors.main.purple100} />
  ),
  error: (
    <IcAlert
      width={24}
      height={24}
      color={theme.colors.semantic.alertRed}
    />
  ),
} satisfies Record<IconType, JSX.Element>;

const SnackBar = ({ onClose, message, iconType }: SnackBarProps) => {
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

  useEffect(() => {
    const timer = setTimeout(hideSheet, 3000);
    return () => clearTimeout(timer);
  }, [hideSheet]);

  const handleCloseButton = () => {
    setIsDissolving(true);
    hideSheet();
  };

  return (
    <S.Wrapper
      ref={snackBarRef}
      $isVisible={isVisible}
      $hasIcon={!!iconType}
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
        {iconType && (
          <S.IconArea aria-hidden="true">{ICON[iconType]}</S.IconArea>
        )}
        <S.Message>{message}</S.Message>
      </S.Content>
      <S.CloseButton
        type="button"
        // NOTE: PC에서는 클릭이 적용되지 않는 현상이 존재하여 해결을 위해 삽입
        onPointerDown={(e) => e.stopPropagation()}
        onClick={handleCloseButton}
        aria-label="스낵바 닫기"
      >
        <IcClose width={24} height={24} color={theme.colors.gray.white} />
      </S.CloseButton>
    </S.Wrapper>
  );
};

export default SnackBar;
