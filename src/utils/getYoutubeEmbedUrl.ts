const YOUTUBE_ID_PATTERN = /^[\w-]{11}$/;
// 앱 WebView에서 youtube.com 네비게이션이 설치된 유튜브 앱으로 가로채이는 것을 피하기 위해
// 앱 링크/유니버설 링크 대상이 아닌 nocookie 도메인을 사용하고, iOS 인라인 재생을 강제합니다
const EMBED_ORIGIN = "https://www.youtube-nocookie.com";
const EMBED_PARAMS = "playsinline=1&modestbranding=1&rel=0";

/** 유튜브 watch/단축/embed URL에서 video id를 추출해 embed URL로 정규화합니다. 파싱 불가하면 null을 반환합니다 */
export const getYoutubeEmbedUrl = (videoUrl: string): string | null => {
  const trimmed = videoUrl.trim();
  if (!trimmed) return null;

  let url: URL;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }

  const isYoutubeDomain = /(^|\.)youtube(-nocookie)?\.com$/.test(url.hostname);
  const isShortDomain = url.hostname === "youtu.be";
  if (!isYoutubeDomain && !isShortDomain) return null;

  let videoId: string | null = null;
  if (isShortDomain) {
    videoId = url.pathname.slice(1);
  } else if (url.pathname.startsWith("/embed/")) {
    videoId = url.pathname.slice("/embed/".length);
  } else if (url.searchParams.has("v")) {
    videoId = url.searchParams.get("v");
  }

  if (!videoId || !YOUTUBE_ID_PATTERN.test(videoId)) return null;
  return `${EMBED_ORIGIN}/embed/${videoId}?${EMBED_PARAMS}`;
};
