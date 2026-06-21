import { useEffect, useState } from "react";
import LogoSmall from "@/assets/icons/logos/logo_small.svg?react";
import OnboardingImage from "@/assets/images/onboarding_image.svg?react";
import * as S from "./OnboardingIllustration1.styles";

const FLOWER_COUNT = 8;
const STEP_SIZE = 87.5;
const VISIBLE_RANGE = 2;
const CENTER_SIZE = 69;
const SIDE_SIZE = 45;

const getSignedDist = (i: number, activeIndex: number): number => {
  const raw =
    (((i - activeIndex) % FLOWER_COUNT) + FLOWER_COUNT) % FLOWER_COUNT;
  return raw > FLOWER_COUNT / 2 ? raw - FLOWER_COUNT : raw;
};

const OnboardingIllustration1 = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FLOWER_COUNT);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <S.Wrapper>
      <S.MessageChip>
        <S.ChipText>
          맨날 밤 새더니 역시 멋지다.{"\n"}전시 준비하느라 고생 많았어!
        </S.ChipText>
      </S.MessageChip>
      <S.SceneGroup>
        <S.Ring />
        <S.Circle />
        <S.FlowerCarousel aria-hidden="true">
          {Array.from({ length: FLOWER_COUNT }, (_, i) => {
            const dist = getSignedDist(i, activeIndex);
            const absDist = Math.abs(dist);
            const isCenter = dist === 0;
            const isVisible = absDist <= VISIBLE_RANGE;
            const size = isCenter ? CENTER_SIZE : SIDE_SIZE;

            return (
              <S.FlowerItem
                key={i}
                $isCenter={isCenter}
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: `translate(calc(-50% + ${dist * STEP_SIZE}px), -50%)`,
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <LogoSmall />
              </S.FlowerItem>
            );
          })}
        </S.FlowerCarousel>
        <S.Character>
          <OnboardingImage />
        </S.Character>
      </S.SceneGroup>
    </S.Wrapper>
  );
};

export default OnboardingIllustration1;
