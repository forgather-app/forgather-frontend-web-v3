import * as S from "./Toggle.styles";

interface ToggleProps {
  /** 토글 활성화 여부 */
  checked: boolean;
  /** 토글 상태 변경 핸들러 */
  onChange: (checked: boolean) => void;
  /** 활성 상태 레이블 (기본값: "전체 공개") */
  onLabel?: string;
  /** 비활성 상태 레이블 (기본값: "나만보기") */
  offLabel?: string;
  /** 레이블 표시 여부 (기본값: true) */
  showLabel?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
}

const Toggle = ({
  checked,
  onChange,
  onLabel = "전체 공개",
  offLabel = "나만보기",
  showLabel = true,
  disabled = false,
}: ToggleProps) => {
  const handleClick = () => {
    if (!disabled) onChange(!checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (!disabled) onChange(!checked);
    }
  };

  const label = checked ? onLabel : offLabel;

  return (
    <S.Wrapper
      role="group"
      aria-label={`공개 설정: ${label}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      $disabled={disabled}
    >
      {showLabel && <S.Label aria-hidden="true">{label}</S.Label>}
      <S.Switch
        role="switch"
        aria-checked={checked}
        aria-label={label}
        $checked={checked}
      >
        <S.Thumb $checked={checked} />
      </S.Switch>
    </S.Wrapper>
  );
};

export default Toggle;
