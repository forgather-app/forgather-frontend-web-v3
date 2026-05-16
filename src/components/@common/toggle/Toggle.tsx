import type { KeyboardEvent } from "react";
import * as S from "./Toggle.styles";

interface ToggleProps {
  /** 토글 활성화 여부 */
  checked: boolean;
  /** 토글 상태 변경 핸들러 */
  onChange: (checked: boolean) => void;
  /** 시각적으로 표시할 레이블. 제공하면 레이블이 렌더링됩니다. */
  label?: string;
  /** 스크린 리더용 접근성 레이블. label이 없을 때 필수입니다. */
  ariaLabel?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}

const Toggle = ({
  checked,
  onChange,
  label,
  ariaLabel,
  disabled = false,
}: ToggleProps) => {
  const showLabel = !!label;
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
      aria-label={ariaLabel ?? label}
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
