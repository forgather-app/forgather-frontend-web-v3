const YOUTUBE_URL_PATTERN =
  /^(https?:\/\/)(www\.)?(m\.)?(youtube\.com\/(watch\?v=[A-Za-z0-9_-]+|shorts\/[A-Za-z0-9_-]+|embed\/[A-Za-z0-9_-]+)|youtu\.be\/[A-Za-z0-9_-]+)/;

/** 유튜브 watch/shorts/embed/단축 URL 형식인지 검사합니다 */
export const checkIsYoutube = (youtubeUrl: string) => {
  return YOUTUBE_URL_PATTERN.test(youtubeUrl);
};
