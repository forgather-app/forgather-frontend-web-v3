const YOUTUBE_ID_PATTERN = /^[\w-]{11}$/;

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

  const isYoutubeDomain = /(^|\.)youtube\.com$/.test(url.hostname);
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
  return `https://www.youtube.com/embed/${videoId}`;
};
