import type { ReactNode } from "react";
import * as S from "./OnboardingSlide.styles";

interface OnboardingSlideProps {
  /** 슬라이드 제목. 줄바꿈은 \n 사용 */
  title: string;
  /** 슬라이드 본문 설명. 줄바꿈은 \n 사용 */
  description: string;
  /** 일러스트 슬롯 (선택). 없으면 빈 영역 표시 */
  illustration?: ReactNode;
}

const OnboardingSlide = ({
  title,
  description,
  illustration,
}: OnboardingSlideProps) => {
  return (
    <S.Container>
      <S.TextSection>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.TextSection>
      <S.IllustrationArea aria-hidden={!illustration}>
        {illustration}
      </S.IllustrationArea>
    </S.Container>
  );
};

export default OnboardingSlide;
