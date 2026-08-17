import { useEffect, useRef, useState } from "react";
import EditIcon from "@/assets/icons/ic_edit.svg?react";
import OnboardingHuman1 from "@/assets/images/onboarding_human1.svg?react";
import OnboardingHuman2 from "@/assets/images/onboarding_human2.svg?react";
import OnboardingHuman3 from "@/assets/images/onboarding_human3.svg?react";
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
        <S.TagAuraOuter $isActive={isActive} aria-hidden="true" />
        <S.TagAuraInner $isActive={isActive} aria-hidden="true" />
        <S.Tag>
          <S.TagIcon aria-hidden="true">
            <EditIcon />
          </S.TagIcon>
          <S.TagText>방명록 남기기</S.TagText>
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
            d="M 90,0 L 50,60"
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
            d="M 210,0 L 250,60"
            pathLength="1"
            stroke="#6247FF"
            strokeWidth="1.5"
            strokeDasharray="0.07 0.05"
          />
        </svg>
      </S.LinesContainer>

      <S.PeopleRow>
        {(
          [
            ["human1", OnboardingHuman1],
            ["human2", OnboardingHuman2],
            ["human3", OnboardingHuman3],
          ] as const
        ).map(([key, HumanImage]) => (
          <S.PersonItem key={key}>
            <S.HumanWrapper $isActive={isActive}>
              <HumanImage />
            </S.HumanWrapper>
          </S.PersonItem>
        ))}
      </S.PeopleRow>
    </S.Wrapper>
  );
};

export default OnboardingIllustration2;
