import { useEffect, useState } from "react";
import LogoSmall from "@/assets/icons/logos/logo_small.svg?react";
import * as S from "./OnboardingIllustration1.styles";

const FLOWER_COUNT = 8;
const STEP_SIZE = 65;
const VISIBLE_RANGE = 2;
const SIDE_SIZE = 50;

const CAROUSEL_STEP_INTERVAL = 2100;

const getSignedDist = (i: number, activeIndex: number): number => {
  const raw =
    (((i - activeIndex) % FLOWER_COUNT) + FLOWER_COUNT) % FLOWER_COUNT;
  return raw > FLOWER_COUNT / 2 ? raw - FLOWER_COUNT : raw;
};

const OnboardingIllustration1 = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FLOWER_COUNT);
    }, CAROUSEL_STEP_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <S.Wrapper>
      <S.MessageChip>
        <S.ChipText>
          맨날 밤 새더니 역시 멋지다.{"\n"}전시 준비하느라 고생 많았어!
        </S.ChipText>
      </S.MessageChip>
      <S.SceneGroup>
        <S.FlowerCarousel aria-hidden="true">
          {Array.from({ length: FLOWER_COUNT }, (_, i) => {
            const dist = getSignedDist(i, activeIndex);
            const absDist = Math.abs(dist);
            const isCenter = dist === 0;
            const isVisible = absDist <= VISIBLE_RANGE;

            return (
              <S.FlowerItem
                key={`${i + 1}-flower`}
                $isCenter={isCenter}
                style={{
                  width: `${SIDE_SIZE}px`,
                  height: `${SIDE_SIZE}px`,
                  transform: `translate(calc(-50% + ${dist * STEP_SIZE}px), -50%)`,
                  opacity: isVisible ? 1 : 0,
                }}
              >
                <LogoSmall />
              </S.FlowerItem>
            );
          })}
        </S.FlowerCarousel>
        <S.PhoneFrame aria-hidden="true">
          <S.PhoneFlower>
            <LogoSmall />
          </S.PhoneFlower>
        </S.PhoneFrame>
        <S.GradientFade aria-hidden="true" />
      </S.SceneGroup>
    </S.Wrapper>
  );
};

export default OnboardingIllustration1;
