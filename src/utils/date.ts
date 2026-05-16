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

export const formatExhibitionPeriod = (startDate: Date, endDate: Date): string =>
  `${formatShortDate(startDate)} - ${formatShortDate(endDate)}`;
