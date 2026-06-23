import { useEffect, useRef, useState } from "react";
import OnboardingSquareImage from "@/assets/images/onboarding_squre_image.svg?react";
import * as S from "./OnboardingIllustration2.styles";

const OnboardingIllustration2 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <S.Wrapper ref={ref}>
      <S.TagWrapper $isActive={isActive}>
        <S.Tag>
          <S.TagHash>#</S.TagHash>
          <S.TagText>포게더 대학교 졸업전시</S.TagText>
        </S.Tag>
      </S.TagWrapper>

      <S.LinesContainer $isActive={isActive}>
        <svg
          viewBox="0 0 300 60"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          aria-hidden="true"
        >
          <path
            d="M 150,0 L 50,60"
            pathLength="1"
            stroke="#6247FF"
            strokeWidth="1.5"
            strokeDasharray="0.07 0.05"
          />
          <path
            d="M 150,0 L 150,60"
            pathLength="1"
            stroke="#6247FF"
            strokeWidth="1.5"
            strokeDasharray="0.07 0.05"
          />
          <path
            d="M 150,0 L 250,60"
            pathLength="1"
            stroke="#6247FF"
            strokeWidth="1.5"
            strokeDasharray="0.07 0.05"
          />
        </svg>
      </S.LinesContainer>

      <S.PeopleRow>
        {[0, 1, 2].map((i) => (
          <S.PersonItem key={i}>
            <S.BoxWrapper $isActive={isActive}>
              <OnboardingSquareImage />
            </S.BoxWrapper>
            <S.PersonRect />
          </S.PersonItem>
        ))}
      </S.PeopleRow>
    </S.Wrapper>
  );
};

export default OnboardingIllustration2;
