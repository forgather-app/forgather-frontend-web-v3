import { ic_close, ic_tooltip_arrow } from "@/assets/icons";
import { theme } from "@/styles/theme";
import * as S from "./Tooltip.styles";

interface TooltipProps {
  /** 툴팁 내용 */
  children: React.ReactNode;
  /** 전달 시 X 버튼 표시 */
  onClose?: () => void;
  /** 접근성 레이블 */
  ariaLabel?: string;
  /** 배경 스타일. dark(기본, 검정) 또는 gradient(그레이 그라데이션) */
  variant?: "dark" | "gradient";
}

const IcClose = ic_close;
const IcTooltipArrow = ic_tooltip_arrow;

const Tooltip = ({
  children,
  onClose,
  ariaLabel,
  variant = "dark",
}: TooltipProps) => {
  const closeButton = onClose && (
    <S.CloseButton onClick={onClose} aria-label="닫기">
      <IcClose
        width={16}
        height={16}
        color={theme.colors.gray.gray300}
        aria-hidden="true"
      />
    </S.CloseButton>
  );

  if (variant !== "gradient") {
    return (
      <S.DarkContainer role="tooltip" aria-label={ariaLabel}>
        {children}
        {closeButton}
      </S.DarkContainer>
    );
  }

  return (
    <S.GradientWrapper>
      <IcTooltipArrow width={32} height={8} aria-hidden="true" />
      <S.GradientContainer role="tooltip" aria-label={ariaLabel}>
        {children}
        {closeButton}
      </S.GradientContainer>
    </S.GradientWrapper>
  );
};

export default Tooltip;
