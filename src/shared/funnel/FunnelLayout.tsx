import type { ReactNode } from "react";
import Button from "@/components/@common/button/Button";
import ProgressBar from "@/components/@common/progressBar/ProgressBar";
import * as S from "./FunnelLayout.styles";

interface FunnelLayoutProps {
  /** 현재 단계 (1부터 시작) */
  step: number;
  /** 전체 단계 수 */
  totalSteps: number;
  /** 상단 제목 */
  title: ReactNode;
  /** 컨텐츠 영역 */
  children: ReactNode;
  /** 다음 버튼 텍스트 */
  buttonText: string;
  /** 다음 버튼 클릭 핸들러 */
  onButtonClick: () => void;
  /** 다음 버튼 비활성화 여부 */
  buttonDisabled?: boolean;
}

const FunnelLayout = ({
  step,
  totalSteps,
  title,
  children,
  buttonText,
  onButtonClick,
  buttonDisabled = false,
}: FunnelLayoutProps) => {
  const progress = (step / totalSteps) * 100;

  return (
    <S.Container>
      <S.Main>
        <ProgressBar value={progress} />
        <S.Content>
          <S.Title>{title}</S.Title>
          {children}
        </S.Content>
      </S.Main>
      <S.Footer>
        <Button
          text={buttonText}
          onClick={onButtonClick}
          disabled={buttonDisabled}
        />
      </S.Footer>
    </S.Container>
  );
};

export default FunnelLayout;
