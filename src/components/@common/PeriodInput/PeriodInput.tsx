import { useId, useState } from "react";
import ClearIcon from "@/assets/icons/ic_clear.svg?react";
import BottomSheet from "@/components/@common/BottomSheet/BottomSheet";
import { formatPeriodDate } from "@/utils/date";
import PeriodCalendarSheet from "./PeriodCalendarSheet";
import * as S from "./PeriodInput.styles";

export interface PeriodInputValue {
  /** 전시 시작일. 선택 전에는 null */
  startDate: Date | null;
  /** 전시 종료일. 선택 전에는 null */
  endDate: Date | null;
}

interface PeriodInputProps {
  /** 선택된 전시 시작일 · 종료일 */
  value: PeriodInputValue;
  /** 시작일 · 종료일을 모두 선택하고 확인을 누르면 호출됩니다 */
  onChange: (value: PeriodInputValue) => void;
  /** 오늘 날짜에 하아라이팅 표시 여부 */
  highlightToday?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
}

const toDateButtonState = (
  hasValue: boolean,
  hasError: boolean,
): S.DateButtonState => {
  if (hasError) return "error";
  return hasValue ? "filled" : "idle";
};

const PeriodInput = ({
  value,
  onChange,
  highlightToday,
  errorMessage,
}: PeriodInputProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const idPrefix = useId();
  const startLabelId = `${idPrefix}-start-label`;
  const endLabelId = `${idPrefix}-end-label`;
  const hasError = !!errorMessage;

  const handleConfirm = (range: { startDate: Date; endDate: Date }) => {
    onChange(range);
    setIsSheetOpen(false);
  };

  return (
    <S.Wrapper>
      <S.Row>
        <S.FieldColumn>
          <S.FieldLabel id={startLabelId}>시작일</S.FieldLabel>
          <S.DateButtonWrapper>
            <S.DateButton
              type="button"
              $state={toDateButtonState(!!value.startDate, hasError)}
              onClick={() => setIsSheetOpen(true)}
              aria-labelledby={startLabelId}
              aria-haspopup="dialog"
              aria-invalid={hasError || undefined}
            >
              {value.startDate
                ? formatPeriodDate(value.startDate)
                : "YYYY.MM.DD"}
            </S.DateButton>
            {value.startDate && (
              <S.ClearButton
                type="button"
                aria-label="시작일 삭제"
                onClick={() => onChange({ ...value, startDate: null })}
              >
                <ClearIcon aria-hidden width={20} height={20} />
              </S.ClearButton>
            )}
          </S.DateButtonWrapper>
        </S.FieldColumn>
        <S.FieldColumn>
          <S.FieldLabel id={endLabelId}>종료일</S.FieldLabel>
          <S.DateButtonWrapper>
            <S.DateButton
              type="button"
              $state={toDateButtonState(!!value.endDate, hasError)}
              onClick={() => setIsSheetOpen(true)}
              aria-labelledby={endLabelId}
              aria-haspopup="dialog"
              aria-invalid={hasError || undefined}
            >
              {value.endDate ? formatPeriodDate(value.endDate) : "YYYY.MM.DD"}
            </S.DateButton>
            {value.endDate && (
              <S.ClearButton
                type="button"
                aria-label="종료일 삭제"
                onClick={() => onChange({ ...value, endDate: null })}
              >
                <ClearIcon aria-hidden width={20} height={20} />
              </S.ClearButton>
            )}
          </S.DateButtonWrapper>
        </S.FieldColumn>
      </S.Row>
      {hasError && <S.ErrorMessage role="alert">{errorMessage}</S.ErrorMessage>}
      {isSheetOpen && (
        <BottomSheet
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          maxContentHeight="80dvh"
        >
          <PeriodCalendarSheet
            initialStartDate={value.startDate}
            initialEndDate={value.endDate}
            onConfirm={handleConfirm}
            highlightToday={highlightToday}
          />
        </BottomSheet>
      )}
    </S.Wrapper>
  );
};

export default PeriodInput;
