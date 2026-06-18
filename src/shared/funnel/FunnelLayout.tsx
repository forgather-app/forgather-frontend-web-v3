import type { ReactNode } from "react";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
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
  /** 하단 버튼 슬롯 (선택) */
  button?: ReactNode;
  /** NavigationBar에 표시할 제목 (선택) */
  navigationTitle?: string;
  /** 뒤로가기 버튼 클릭 핸들러 */
  onBackClick?: () => void;
}

const FunnelLayout = ({
  stepIndex,
  totalSteps,
  title,
  children,
  button,
  navigationTitle,
  onBackClick,
}: FunnelLayoutProps) => {
  const progress = ((stepIndex + 1) / totalSteps) * 100;

  return (
    <S.Container>
      <S.TopGroup>
        <NavigationBar title={navigationTitle} onBackClick={onBackClick} />
        <ProgressBar value={progress} />
      </S.TopGroup>
      <S.Title>{title}</S.Title>
      <S.Main>{children}</S.Main>
      {button && <S.Footer>{button}</S.Footer>}
    </S.Container>
  );
};

export default FunnelLayout;
