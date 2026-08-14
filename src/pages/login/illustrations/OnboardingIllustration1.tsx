import { useEffect, useState } from "react";
import LogoSmall from "@/assets/icons/logos/logo_small.svg?react";
import * as S from "./OnboardingIllustration1.styles";

const FLOWER_COUNT = 8;
const STEP_SIZE = 65;
const VISIBLE_RANGE = 2;
const SIDE_SIZE = 50;

const CAROUSEL_MOVE_DURATION = 1500;
const PHONE_FLOWER_TRANSITION_DURATION = 1000;
const PHONE_FLOWER_HOLD_DURATION = 1200;
const NEXT_STEP_DELAY = 600;

const getSignedDist = (i: number, activeIndex: number): number => {
  const raw =
    (((i - activeIndex) % FLOWER_COUNT) + FLOWER_COUNT) % FLOWER_COUNT;
  return raw > FLOWER_COUNT / 2 ? raw - FLOWER_COUNT : raw;
};

const OnboardingIllustration1 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPhoneFlowerVisible, setIsPhoneFlowerVisible] = useState(false);

  useEffect(() => {
    const timeoutIds: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, delay: number) => {
      timeoutIds.push(setTimeout(fn, delay));
    };

    // 꽃 한 칸 이동 → 이동 종료 후 핸드폰 안 꽃 확대 등장 → 유지 → 축소 소멸 → 다음 이동, 반복
    const runCycle = () => {
      setActiveIndex((prev) => (prev + 1) % FLOWER_COUNT);

      schedule(() => {
        setIsPhoneFlowerVisible(true);

        schedule(() => {
          setIsPhoneFlowerVisible(false);

          schedule(
            runCycle,
            PHONE_FLOWER_TRANSITION_DURATION + NEXT_STEP_DELAY,
          );
        }, PHONE_FLOWER_HOLD_DURATION);
      }, CAROUSEL_MOVE_DURATION);
    };

    schedule(runCycle, NEXT_STEP_DELAY);

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
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
          <S.PhoneFlower $isVisible={isPhoneFlowerVisible}>
            <LogoSmall />
          </S.PhoneFlower>
        </S.PhoneFrame>
        <S.GradientFade aria-hidden="true" />
      </S.SceneGroup>
    </S.Wrapper>
  );
};

export default OnboardingIllustration1;
