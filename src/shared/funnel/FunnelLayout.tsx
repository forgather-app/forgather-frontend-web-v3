import type { ReactNode } from "react";
import ProgressBar from "@/components/@common/ProgressBar/ProgressBar";
import * as S from "./FunnelLayout.styles";

interface FunnelLayoutProps {
  /** 현재 단계 인덱스 (0부터 시작) */
  stepIndex: number;
  /** 전체 단계 수 */
  totalSteps: number;
  /** 상단 제목. 줄바꿈은 \n 사용 */
  title: string;
  /** 컨텐츠 영역 */
  children: ReactNode;
  /** 하단 버튼 슬롯 */
  button: ReactNode;
}

const FunnelLayout = ({
  stepIndex,
  totalSteps,
  title,
  children,
  button,
}: FunnelLayoutProps) => {
  const progress = ((stepIndex + 1) / totalSteps) * 100;

  return (
    <S.Container>
      <S.Main>
        <ProgressBar value={progress} />
        <S.Content>
          <S.Title>{title}</S.Title>
          {children}
        </S.Content>
      </S.Main>
      <S.Footer>{button}</S.Footer>
    </S.Container>
  );
};

export default FunnelLayout;
