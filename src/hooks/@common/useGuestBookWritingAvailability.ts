import { useEffect, useState } from "react";
import { useGetSpaceInformation } from "@/api/generated/space-스페이스";
import type { ApiResponseSpaceResponse, SpaceResponse } from "@/api/model";
import { isWithinGuestBookWritingPeriod } from "@/utils/guestBookWritingPolicy";

export const useGuestBookWritingAvailability = (spaceCode: string) => {
  const [now, setNow] = useState(Date.now);
  const {
    data: space,
    refetch,
    dataUpdatedAt,
  } = useGetSpaceInformation<SpaceResponse>(spaceCode, {
    query: {
      select: (response) =>
        (response as unknown as ApiResponseSpaceResponse).data ?? {},
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: Reschedule after a timer tick or refetch even when the cached space object is unchanged.
  useEffect(() => {
    if (space?.guestBookWritingPolicy !== "EXHIBITION_PERIOD") return;
    const currentTime = Date.now();
    const boundaries = [
      space.exhibitionStartDate
        ? Date.parse(`${space.exhibitionStartDate}T00:00:00+09:00`)
        : NaN,
      space.exhibitionEndDate
        ? Date.parse(`${space.exhibitionEndDate}T00:00:00+09:00`) + 86_400_000
        : NaN,
    ].filter((boundary) => boundary > currentTime);
    if (!boundaries.length) return;
    // Long exhibitions may exceed the browser's maximum timeout; reschedule in that case.
    const delay = Math.min(
      Math.min(...boundaries) - currentTime,
      2_147_483_647,
    );
    const timer = window.setTimeout(() => {
      setNow(Date.now());
      void refetch();
    }, delay);
    return () => window.clearTimeout(timer);
  }, [space, now, dataUpdatedAt, refetch]);

  const checkAvailability = async (): Promise<boolean> => {
    const result = await refetch();
    setNow(Date.now());
    if (result.isError) throw result.error;
    return (
      !!result.data &&
      result.data.isGuestBookWritable !== false &&
      isWithinGuestBookWritingPeriod(result.data)
    );
  };

  return {
    space,
    isWritable:
      !!space &&
      space.isGuestBookWritable !== false &&
      isWithinGuestBookWritingPeriod(space),
    checkAvailability,
  };
};
