import { useEffect } from "react";
import useDisclosure from "@/hooks/@common/useDisclosure";
import * as S from "./ActionSnackBar.styles";

/**
 * 3초 후 자동으로 닫히는 액션 버튼이 있는 스낵바.
 *
 * 버튼을 눌렀을 때만 인터랙션이 동작합니다.
 * `{isOpen && <ActionSnackBar />}` 패턴으로 마운트/언마운트합니다.
 */
interface ActionSnackBarProps {
  /** 스낵바 열림 여부. true일 때 마운트합니다 (`{isOpen && <ActionSnackBar />}` 패턴 사용). */
  isOpen: boolean;
  /** 닫힘 애니메이션 종료 후 호출되는 콜백. 부모에서 isOpen을 false로 전환해 언마운트합니다. */
  onClose: () => void;
  /** 액션 버튼 클릭 시 호출되는 콜백 */
  onClick: () => void;
  /** 스낵바에 표시할 메시지 */
  message: string;
}

const ActionSnackBar = ({
  isOpen,
  onClose,
  onClick,
  message,
}: ActionSnackBarProps) => {
  const { isVisible, hideSheet, alertAnimationEnd } = useDisclosure({
    isOpen,
    onClose,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: 스낵바 마운트 시 1회만 타이머 설정
  useEffect(() => {
    const timer = setTimeout(hideSheet, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
    onClick();
    hideSheet();
  };

  return (
    <S.Wrapper
      $isVisible={isVisible}
      onAnimationEnd={alertAnimationEnd}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <S.Message>{message}</S.Message>
      <S.ActionButton
        type="button"
        onClick={handleButtonClick}
        aria-label="액션 실행"
      >
        취소하기
      </S.ActionButton>
    </S.Wrapper>
  );
};

export default ActionSnackBar;
