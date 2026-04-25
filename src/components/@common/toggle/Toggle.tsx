import type { KeyboardEvent } from "react";
import * as S from "./Toggle.styles";

interface ToggleProps {
  /** 토글 활성화 여부 */
  checked: boolean;
  /** 토글 상태 변경 핸들러 */
  onChange: (checked: boolean) => void;
  /** 레이블 (기본값: "토글 레이블") */
  label?: string;
  /** 레이블 표시 여부 (기본값: true) */
  showLabel?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
}

const Toggle = ({
  checked,
  onChange,
  label = "토글 레이블",
  showLabel = true,
  disabled = false,
}: ToggleProps) => {
  const handleClick = () => {
    onChange(!checked);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <S.Wrapper
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      $disabled={disabled}
    >
      {showLabel && <S.Label aria-hidden="true">{label}</S.Label>}
      <S.Switch $checked={checked}>
        <S.Thumb $checked={checked} />
      </S.Switch>
    </S.Wrapper>
  );
};

export default Toggle;
