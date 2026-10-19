const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

const parseDateParts = (date: Date) => ({
  year: date.getFullYear(),
  month: String(date.getMonth() + 1).padStart(2, "0"),
  day: String(date.getDate()).padStart(2, "0"),
  weekday: WEEKDAYS[date.getDay()],
  hours: String(date.getHours()).padStart(2, "0"),
  minutes: String(date.getMinutes()).padStart(2, "0"),
});

export const formatGuestDisplayDate = (date: Date): string => {
  const { year, month, day, weekday, hours, minutes } = parseDateParts(date);
  return `${year}. ${month}. ${day} (${weekday})  |  ${hours}:${minutes}`;
};

export const formatShortDate = (date: Date): string => {
  const { year, month, day } = parseDateParts(date);
  return `${String(year).slice(-2)}.${Number(month)}.${Number(day)}`;
};

export const formatPeriodDate = (date: Date): string => {
  const { year, month, day } = parseDateParts(date);
  return `${year}.${month}.${day}`;
};

export const formatExhibitionPeriod = (
  startDate: Date,
  endDate: Date,
): string => `${formatShortDate(startDate)} - ${formatShortDate(endDate)}`;

export const formatCardDate = (date: Date): string => {
  const { year, month, day } = parseDateParts(date);
  return `${String(year).slice(-2)}.${month}.${day}`;
};

export const formatCardTime = (date: Date): string => {
  const { hours, minutes } = parseDateParts(date);
  return `${hours}:${minutes}`;
};

/** API로 보낼 날짜 전용(시간 없음) 문자열로 변환합니다 (YYYY-MM-DD). */
export const toDateOnlyString = (date: Date): string => {
  const { year, month, day } = parseDateParts(date);
  return `${year}-${month}-${day}`;
};

/** API에서 받은 날짜 전용(YYYY-MM-DD) 문자열을 로컬 타임존의 Date로 변환합니다. */
export const parseDateOnlyString = (value: string): Date => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

/** 스페이스 상세의 "전시 일정"에 표시하는 형식입니다 (예: "2026.11.06 (금) — 11.09 (월)"). */
export const formatExhibitionSchedule = (
  startDate: Date,
  endDate: Date,
): string => {
  const start = parseDateParts(startDate);
  const end = parseDateParts(endDate);
  const startText = `${start.year}.${start.month}.${start.day} (${start.weekday})`;
  const endText =
    start.year === end.year
      ? `${end.month}.${end.day} (${end.weekday})`
      : `${end.year}.${end.month}.${end.day} (${end.weekday})`;

  return `${startText} — ${endText}`;
};
