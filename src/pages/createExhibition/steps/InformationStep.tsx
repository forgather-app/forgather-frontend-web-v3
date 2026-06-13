import { useState } from "react";
import IcLink from "@/assets/icons/ic_link.svg?react";
import IcLocation from "@/assets/icons/ic_location.svg?react";
import PickerField from "@/components/@common/pickerField/PickerField";
import ItemLayout from "@/shared/funnel/ItemLayout";
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
  const [date, _setDate] = useState("");
  const [operatingHours, _setOperatingHours] = useState("");
  const [location, setLocation] = useState<Location | null>(null);

  const isValid = !!date && !!operatingHours && !!location;

  const handleLocationSelect = (value: Location) => () => setLocation(value);

  const handleNext = () => {
    if (!location) return;
    onNext({ date, operatingHours, location });
  };

  return (
    <ItemLayout text="다음" disabled={!isValid} onClick={handleNext}>
      <S.FieldsWrapper>
        <S.FieldGroup>
          <S.Label>날짜</S.Label>
          <PickerField value={date} placeholder="날짜를 선택해주세요" />
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
    </ItemLayout>
  );
};

export default InformationStep;
