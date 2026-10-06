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

const MARQUEE_STATS = [...LANDING_STATS, ...LANDING_STATS];
const [testimonialT1, testimonialT2, testimonialT3, testimonialT4] =
  LANDING_TESTIMONIALS;
const TESTIMONIALS_ALT_ORDER = [
  testimonialT2,
  testimonialT1,
  testimonialT4,
  testimonialT3,
];

const COLLAGE_ROWS: {
  id: string;
  opacity: number;
  marginTop: number;
  marginTopDesktop: number;
  shift: number;
  shiftDesktop: number;
  altOrder: boolean;
}[] = [
  {
    id: "row1",
    opacity: 0.05,
    marginTop: 0,
    marginTopDesktop: 0,
    shift: -80,
    shiftDesktop: -150,
    altOrder: true,
  },
  {
    id: "row2",
    opacity: 1,
    marginTop: 117,
    marginTopDesktop: 90,
    shift: 50,
    shiftDesktop: 90,
    altOrder: false,
  },
  {
    id: "row3",
    opacity: 1,
    marginTop: 16,
    marginTopDesktop: 32,
    shift: -40,
    shiftDesktop: -70,
    altOrder: true,
  },
  {
    id: "row4",
    opacity: 0.1,
    marginTop: 16,
    marginTopDesktop: 32,
    shift: 70,
    shiftDesktop: 130,
    altOrder: false,
  },
];

const LandingProblem = () => {
  return (
    <S.Wrapper>
      <S.CollageLayer aria-hidden="true">
        {COLLAGE_ROWS.map((row) => {
          const testimonials = row.altOrder
            ? TESTIMONIALS_ALT_ORDER
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
            <S.StatRow $duration={22}>
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
