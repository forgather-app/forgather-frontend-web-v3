import decoArcMo from "@/assets/icons/landing/deco_arc_mo.svg";
import decoArcPc from "@/assets/icons/landing/deco_arc_pc.svg";
import decoDashMo from "@/assets/icons/landing/deco_dash_mo.svg";
import decoDashPc from "@/assets/icons/landing/deco_dash_pc.svg";
import icQuote from "@/assets/icons/landing/ic_quote.svg";
import profileFallback from "@/assets/icons/profile.svg";
import { Highlight, MobileBreak } from "@/pages/landing/Landing.shared.styles";
import {
  LANDING_STATS,
  LANDING_TESTIMONIALS,
} from "@/pages/landing/LandingPage.constants";
import * as S from "./LandingProblem.styles";

// 무한 루프 마퀴: 동일한 목록을 두 번 이어 붙이고 -50% 만큼 이동시켜 이어지는 것처럼 보이게 한다
const MARQUEE_STATS = [...LANDING_STATS, ...LANDING_STATS];
const TESTIMONIALS_REVERSED = [...LANDING_TESTIMONIALS].reverse();

// 인용 헤딩 뒤로 어긋나게 쌓이는 정적 카드 콜라주 4행 - 위/아래로 갈수록 옅어지는 배경 텍스처
// row1은 헤딩과 겹치도록 살짝 비치고, row2부터는 헤딩/설명 텍스트 아래로 내려와 배치된다
// row2는 t1-t2-t3, row3는 t3-t2-t1 순서로 어긋나게 배치한다
const COLLAGE_ROWS: {
  id: string;
  opacity: number;
  marginTop: number;
  marginTopDesktop: number;
  shift: number;
  shiftDesktop: number;
  reverse: boolean;
}[] = [
  {
    id: "row1",
    opacity: 0.05,
    marginTop: 0,
    marginTopDesktop: 0,
    shift: -80,
    shiftDesktop: -150,
    reverse: true,
  },
  {
    id: "row2",
    opacity: 1,
    marginTop: 117,
    marginTopDesktop: 90,
    shift: 50,
    shiftDesktop: 90,
    reverse: false,
  },
  {
    id: "row3",
    opacity: 1,
    marginTop: 16,
    marginTopDesktop: 32,
    shift: -40,
    shiftDesktop: -70,
    reverse: true,
  },
  {
    id: "row4",
    opacity: 0.1,
    marginTop: 16,
    marginTopDesktop: 32,
    shift: 70,
    shiftDesktop: 130,
    reverse: false,
  },
];

const LandingProblem = () => {
  return (
    <S.Wrapper>
      <S.CollageLayer aria-hidden="true">
        {COLLAGE_ROWS.map((row) => {
          const testimonials = row.reverse
            ? TESTIMONIALS_REVERSED
            : LANDING_TESTIMONIALS;
          return (
            <S.CollageRowViewport
              key={row.id}
              $opacity={row.opacity}
              $marginTop={row.marginTop}
              $marginTopDesktop={row.marginTopDesktop}
            >
              <S.CollageRow $shift={row.shift} $shiftDesktop={row.shiftDesktop}>
                {testimonials.map((testimonial) => (
                  <S.TestimonialCard key={`${row.id}-${testimonial.id}`}>
                    <S.TestimonialIcon src={profileFallback} alt="" />
                    <S.TestimonialText>{testimonial.message}</S.TestimonialText>
                  </S.TestimonialCard>
                ))}
              </S.CollageRow>
            </S.CollageRowViewport>
          );
        })}
      </S.CollageLayer>

      <S.Content>
        <S.QuoteGroup>
          <S.QuoteHeadingRow>
            <S.QuoteIcon src={icQuote} alt="" aria-hidden="true" />
            <S.QuoteHeading>
              {"전시가 끝나면,"}
              <MobileBreak />
              {" 축하의 마음도 "}
              <Highlight>흩어지니까</Highlight>
            </S.QuoteHeading>
            <S.QuoteIcon src={icQuote} alt="" aria-hidden="true" />
          </S.QuoteHeadingRow>
          <S.QuoteDescription>
            전시 공간의 한계부터 흩어진 메시지와 기록까지, 소중한 전시의 순간을
            온전히 남기기엔 아쉬움이 있었어요
          </S.QuoteDescription>
        </S.QuoteGroup>

        <S.SummaryGroup>
          <S.ArcGraphic
            $variant="mobile"
            src={decoArcMo}
            alt=""
            aria-hidden="true"
          />
          <S.ArcGraphic
            $variant="desktop"
            src={decoArcPc}
            alt=""
            aria-hidden="true"
          />
          <S.DashTick
            $variant="mobile"
            src={decoDashMo}
            alt=""
            aria-hidden="true"
          />
          <S.DashTick
            $variant="desktop"
            src={decoDashPc}
            alt=""
            aria-hidden="true"
          />
          <S.SummaryHeading>
            {"흩어지던 전시의 순간을,"}
            <MobileBreak /> <Highlight>포게더</Highlight>
            {"에 모았어요"}
          </S.SummaryHeading>
          <S.MarqueeViewport>
            <S.StatRow $duration={22} $reverse>
              {MARQUEE_STATS.map((stat, index) => (
                <S.StatCard key={`${stat.id}-${index}`}>
                  <S.StatValue>{stat.value}</S.StatValue>
                  <S.StatDescription>{stat.description}</S.StatDescription>
                </S.StatCard>
              ))}
            </S.StatRow>
          </S.MarqueeViewport>
        </S.SummaryGroup>
      </S.Content>
    </S.Wrapper>
  );
};

export default LandingProblem;
