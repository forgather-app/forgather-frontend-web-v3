import type { GuestBookWritingPolicy, SpaceResponse } from "@/api/model";
import type { ExhibitionPeriodValue } from "@/components/@common/ExhibitionPeriodField/ExhibitionPeriodField";

export const GUEST_BOOK_PERIOD_MESSAGE =
  "전시 기간에만 방명록을 남길 수 있어요";
export const validateGuestBookWritingPeriod = (
  policy: GuestBookWritingPolicy,
  period: ExhibitionPeriodValue,
): true | string =>
  policy === "EXHIBITION_PERIOD" && (!period.startDate || !period.endDate)
    ? "전시 기간에만 작성하도록 설정하려면 전시 기간을 입력해주세요."
    : true;

export const isWithinGuestBookWritingPeriod = (
  space: SpaceResponse,
  now: number = Date.now(),
): boolean => {
  if (space.guestBookWritingPolicy !== "EXHIBITION_PERIOD") return true;
  if (!space.exhibitionStartDate || !space.exhibitionEndDate) return false;
  const start = Date.parse(`${space.exhibitionStartDate}T00:00:00+09:00`);
  const endExclusive =
    Date.parse(`${space.exhibitionEndDate}T00:00:00+09:00`) + 86_400_000;
  return now >= start && now < endExclusive;
};
