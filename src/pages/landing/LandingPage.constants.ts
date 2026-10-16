/** 랜딩 페이지 PC 레이아웃이 적용되는 최소 뷰포트 너비 (Figma: 모바일 360 / PC 1440 2종 디자인) */
export const LANDING_DESKTOP_MIN_WIDTH = "1024px";

export const LANDING_DESKTOP_QUERY = `@media (min-width: ${LANDING_DESKTOP_MIN_WIDTH})`;

/** 포게더 카카오톡 채널 - 헤더 "문의하기"와 푸터 카카오톡 아이콘이 공유한다 */
export const LANDING_KAKAO_CHANNEL_URL = "https://pf.kakao.com/_rHNtn";

/** Hero CTA와 앱 안내 모달이 공유한다 */
export const LANDING_APP_STORE_URL =
  "https://apps.apple.com/kr/app/%ED%8F%AC%EA%B2%8C%EB%8D%94-forgather/id6795543031?l=en-GB";

/** 오늘 하루 보지 않기 상태를 저장하는 localStorage 키 */
export const LANDING_APP_NOTICE_DISMISS_KEY =
  "forgather:landing-app-notice-dismissed";

export interface LandingStat {
  id: string;
  value: string;
  description: string;
}

export const LANDING_STATS: LandingStat[] = [
  {
    id: "school",
    value: "계원예대",
    description: "애니메이션과 졸업전시\n온라인 도록을 진행했어요",
  },
  {
    id: "artist",
    value: "200+",
    description: "명의 작가가 포게더를 사용했어요",
  },
  { id: "artwork", value: "200+", description: "점의 작품이 소개됐어요" },
  {
    id: "guestbook",
    value: "800+",
    description: "개의 소중한 방명록이 모였어요",
  },
];

export interface LandingTestimonial {
  id: string;
  message: string;
}

export const LANDING_TESTIMONIALS: LandingTestimonial[] = [
  {
    id: "t1",
    message:
      "전시 공간이 부족해서 작품 소개와\n방명록 등 개인 공간을 마련하지 못했어요",
  },
  {
    id: "t2",
    message: "매 전시마다 전달받은 축하 메세지가\n흩어져 모아보기 불편했어요",
  },
  {
    id: "t3",
    message: "전시가 끝나고 축하 받은 것들이\n기록으로 남지 않아 아쉬웠어요",
  },
  {
    id: "t4",
    message:
      "전시 상주 시간을 매번 따로 안내해야 해서\n초대와 안내가 번거로웠어요",
  },
];

export type LandingFeatureId = "space" | "share" | "guestbook" | "artwork";

export interface LandingFeature {
  id: LandingFeatureId;
  eyebrow: string;
  heading: string;
  description: string;
}

export const LANDING_FEATURES: LandingFeature[] = [
  {
    id: "space",
    eyebrow: "스페이스",
    heading: "나만의 전시 공간을 만들어보세요",
    description:
      "전시 정보부터 작품까지, 공간의 제약 없이\n나만의 작품과 이야기를 마음껏 펼쳐보세요",
  },
  {
    id: "share",
    eyebrow: "공유",
    heading: "소중한 사람들에게 전시 링크와\n초대장을 간편하게 공유해보세요",
    description:
      "QR 코드와 카카오톡으로 전시 링크를 손쉽게 나누고,\n소중한 사람들을 초대해보세요",
  },
  {
    // "^"는 모바일에서만 줄바꿈되는 지점을 표시한다 (PC는 한 줄로 표시)
    id: "guestbook",
    eyebrow: "방명록",
    heading: "간편하게 방명록을 남기고,^따듯한 마음을 모아보세요",
    description:
      "전시를 찾아준 사람들의 따뜻한 메시지를 하나의 기록으로 남겨보세요",
  },
  {
    id: "artwork",
    eyebrow: "작품소개",
    heading: "공들여 만든 작품을 상세하게 소개해보세요",
    description:
      "작품에 담긴 생각과 과정, 전하고 싶은 이야기를 함께 남겨보세요",
  },
];
