import * as S from "./CircleButton.styles";

interface CircleButtonProps {
  /** 버튼 내부에 렌더링할 아이콘. 24x24 크기 권장 */
  children: React.ReactNode;
  /** 스크린리더가 읽을 버튼 설명. 아이콘 전용 버튼이므로 필수 */
  "aria-label": string;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 버튼 타입 */
  type?: "button" | "submit" | "reset";
}

/**
 * 40x40 원형 아이콘 버튼.
 *
 * 어두운 배경(gray500)과 그림자를 가지며, 아이콘 전용 액션에 사용합니다.
 * 스크린리더 접근성을 위해 `aria-label`이 필수입니다.
 */
const CircleButton = ({
  children,
  "aria-label": ariaLabel,
  onClick,
  type = "button",
}: CircleButtonProps) => {
  return (
    <S.Button type={type} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </S.Button>
  );
};

export default CircleButton;
