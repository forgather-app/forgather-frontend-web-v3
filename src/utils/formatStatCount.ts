/** 통계 수치를 10단위로 올림해 "N+" 형태로 표시한다 (예: 237 -> "240+") */
export const formatStatCount = (count?: number): string => {
  const rounded = Math.ceil((count ?? 0) / 10) * 10;
  return `${rounded}+`;
};
