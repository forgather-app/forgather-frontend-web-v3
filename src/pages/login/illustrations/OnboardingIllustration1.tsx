import { useEffect, useState } from "react";
import LogoSmall from "@/assets/icons/logos/logo_small.svg?react";
import * as S from "./OnboardingIllustration1.styles";

const FLOWER_COUNT = 8;
const STEP_SIZE = 65;
const VISIBLE_RANGE = 2;
const SIDE_SIZE = 50;

const MESSAGES = [
  "맨날 밤 새더니 작품 너무 좋다\n전시 준비하느라 고생 많았어!",
  "사랑하는 우리 딸!\n너무 멋지다~ 언제나 응원할게",
  "지나가다가 봤는데\n너무 멋있어요. 졸업 축하드립니다!",
];
/** 모든 애니메이션(맥박, 배경 캐러셀, 메시지 스와이핑)의 기준 주기 */
const MESSAGE_INTERVAL = 3000;
const CAROUSEL_STEP_INTERVAL = MESSAGE_INTERVAL;

const getSignedDist = (
  i: number,
  activeIndex: number,
  count: number,
): number => {
  const raw = (((i - activeIndex) % count) + count) % count;
  return raw > count / 2 ? raw - count : raw;
};

const OnboardingIllustration1 = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FLOWER_COUNT);
    }, CAROUSEL_STEP_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, MESSAGE_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <S.Wrapper>
      <S.MessageChip>
        {MESSAGES.map((message, i) => (
          <S.ChipText
            // biome-ignore lint/suspicious/noArrayIndexKey: 고정된 메시지 목록의 위치 기반 슬라이드
            key={i}
            $dist={getSignedDist(i, messageIndex, MESSAGES.length)}
          >
            {message}
          </S.ChipText>
        ))}
      </S.MessageChip>
      <S.SceneGroup>
        <S.FlowerCarousel aria-hidden="true">
          {Array.from({ length: FLOWER_COUNT }, (_, i) => {
            const dist = getSignedDist(i, activeIndex, FLOWER_COUNT);
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
