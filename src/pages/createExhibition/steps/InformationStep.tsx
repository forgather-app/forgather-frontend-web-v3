import { useState } from "react";
import IcLink from "@/assets/icons/ic_link.svg?react";
import IcLocation from "@/assets/icons/ic_location.svg?react";
import BottomSheet from "@/components/@common/BottomSheet/BottomSheet";
import type { DateRange } from "@/components/@common/dateRangePicker/DateRangePicker";
import DateRangePicker from "@/components/@common/dateRangePicker/DateRangePicker";
import PickerField from "@/components/@common/pickerField/PickerField";
import ItemLayout from "@/shared/funnel/ItemLayout";
import { formatDateRange } from "@/utils/date";
import * as S from "./InformationStep.styles";

type Location = "online" | "offline";

interface InformationStepProps {
  onNext: (data: {
    date: string;
    operatingHours: string;
    location: Location;
  }) => void;
}

const InformationStep = ({ onNext }: InformationStepProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [operatingHours, _setOperatingHours] = useState("");
  const [location, setLocation] = useState<Location | null>(null);

  const isValid =
    !!dateRange?.from && !!dateRange?.to && !!operatingHours && !!location;

  const handleLocationSelect = (value: Location) => () => setLocation(value);

  const handleNext = () => {
    if (!location) return;
    onNext({ date: formatDateRange(dateRange), operatingHours, location });
  };

  return (
    <ItemLayout text="다음" disabled={!isValid} onClick={handleNext}>
      <S.FieldsWrapper>
        <S.FieldGroup>
          <S.Label>날짜</S.Label>
          <PickerField
            value={formatDateRange(dateRange)}
            placeholder="날짜를 선택해주세요"
            onClick={() => setIsDateOpen(true)}
          />
        </S.FieldGroup>
        <S.FieldGroup>
          <S.Label>운영 시간</S.Label>
          <PickerField
            value={operatingHours}
            placeholder="운영 방식을 선택해주세요"
          />
        </S.FieldGroup>
        <S.FieldGroup>
          <S.Label>장소</S.Label>
          <S.LocationButtons>
            <S.LocationButton
              type="button"
              $isSelected={location === "online"}
              onClick={handleLocationSelect("online")}
            >
              <IcLink width={20} height={20} aria-hidden />
              온라인
            </S.LocationButton>
            <S.LocationButton
              type="button"
              $isSelected={location === "offline"}
              onClick={handleLocationSelect("offline")}
            >
              <IcLocation width={20} height={20} aria-hidden />
              오프라인
            </S.LocationButton>
          </S.LocationButtons>
        </S.FieldGroup>
      </S.FieldsWrapper>

      {isDateOpen && (
        <S.BottomSheetContainer>
          <BottomSheet isOpen={isDateOpen} onClose={() => setIsDateOpen(false)}>
            <DateRangePicker selected={dateRange} onSelect={setDateRange} />
          </BottomSheet>
        </S.BottomSheetContainer>
      )}
    </ItemLayout>
  );
};

export default InformationStep;
