import type { ReactNode } from "react";
import ProgressBar from "@/components/@common/progressBar/ProgressBar";
import * as S from "./FunnelLayout.styles";

interface FunnelLayoutProps {
  /** 현재 단계 인덱스 (0부터 시작) */
  stepIndex: number;
  /** 전체 단계 수 */
  totalSteps: number;
  /** 단계 제목. 줄바꿈은 \n 사용 */
  title: string;
  /** 단계 컴포넌트 (ItemLayout으로 감싸야 함) */
  children: ReactNode;
}

// TODO: #78 머지 후 HeaderScrollLayout + NavigationBar로 교체
const FunnelLayout = ({
  stepIndex,
  totalSteps,
  title,
  children,
}: FunnelLayoutProps) => {
  const progress = ((stepIndex + 1) / totalSteps) * 100;

  return (
    <S.Container>
      <S.Top>
        <ProgressBar value={progress} />
        <S.Title>{title}</S.Title>
      </S.Top>
      <S.Body>{children}</S.Body>
    </S.Container>
  );
};

export default FunnelLayout;
