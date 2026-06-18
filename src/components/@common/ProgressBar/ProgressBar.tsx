import * as S from "./ProgressBar.styles";

interface ProgressBarProps {
  /** 진행률 (0~100) */
  value: number;
  /** 접근성용 레이블 */
  "aria-label"?: string;
}

const ProgressBar = ({
  value,
  "aria-label": ariaLabel = "진행 상태",
}: ProgressBarProps) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <S.Track
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
    >
      <S.Fill style={{ transform: `scaleX(${clampedValue / 100})` }} />
    </S.Track>
  );
};

export default ProgressBar;
