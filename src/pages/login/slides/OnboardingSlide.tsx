import * as S from "./OnboardingSlide.styles";

interface OnboardingSlideProps {
  /** 슬라이드 제목. 줄바꿈은 \n 사용 */
  title: string;
  /** 슬라이드 본문 설명. 줄바꿈은 \n 사용 */
  description: string;
}

const OnboardingSlide = ({ title, description }: OnboardingSlideProps) => {
  return (
    <S.Container>
      <S.TextSection>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
      </S.TextSection>
      <S.IllustrationArea aria-hidden="true" />
    </S.Container>
  );
};

export default OnboardingSlide;
