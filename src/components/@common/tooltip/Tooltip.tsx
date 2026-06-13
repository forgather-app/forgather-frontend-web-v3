import { ic_close } from "@/assets/icons";
import * as S from "./Tooltip.styles";

interface TooltipProps {
  /** 툴팁 내용 */
  children: React.ReactNode;
  /** 전달 시 X 버튼 표시 */
  onClose?: () => void;
  /** 접근성 레이블 */
  ariaLabel?: string;
}

const IcClose = ic_close;

const Tooltip = ({ children, onClose, ariaLabel }: TooltipProps) => {
  return (
    <S.Container role="tooltip" aria-label={ariaLabel}>
      {children}
      {onClose && (
        <S.CloseButton onClick={onClose} aria-label="닫기">
          <IcClose width={16} height={16} aria-hidden="true" />
        </S.CloseButton>
      )}
    </S.Container>
  );
};

export default Tooltip;
