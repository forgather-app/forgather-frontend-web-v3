import { useState } from "react";
import { type DateRange, DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale/ko";
import "react-day-picker/style.css";
import Button from "@/components/@common/Button/Button";
import * as S from "./ExhibitionPeriodCalendarSheet.styles";

interface ExhibitionPeriodCalendarSheetProps {
  /** 시트가 열릴 때 초기 선택값으로 사용할 시작일 */
  initialStartDate: Date | null;
  /** 시트가 열릴 때 초기 선택값으로 사용할 종료일 */
  initialEndDate: Date | null;
  /** 시작일 · 종료일을 모두 선택하고 확인을 누르면 호출됩니다 */
  onConfirm: (value: { startDate: Date; endDate: Date }) => void;
}

const ExhibitionPeriodCalendarSheet = ({
  initialStartDate,
  initialEndDate,
  onConfirm,
}: ExhibitionPeriodCalendarSheetProps) => {
  const [range, setRange] = useState<DateRange | undefined>(
    initialStartDate
      ? { from: initialStartDate, to: initialEndDate ?? undefined }
      : undefined,
  );

  const canConfirm = !!(range?.from && range?.to);

  const handleConfirm = () => {
    if (!range?.from || !range?.to) return;
    onConfirm({ startDate: range.from, endDate: range.to });
  };

  return (
    <>
      <S.Header>
        <S.Title>전시 기간을 선택해주세요</S.Title>
      </S.Header>
      <S.CalendarWrapper>
        <DayPicker
          mode="range"
          locale={ko}
          selected={range}
          onSelect={setRange}
          defaultMonth={initialStartDate ?? undefined}
          showOutsideDays
        />
      </S.CalendarWrapper>
      <S.Footer>
        <Button text="확인" onClick={handleConfirm} disabled={!canConfirm} />
      </S.Footer>
    </>
  );
};

export default ExhibitionPeriodCalendarSheet;
