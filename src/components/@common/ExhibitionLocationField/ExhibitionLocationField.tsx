import { useEffect, useId, useRef, useState } from "react";
import CloseIcon from "@/assets/icons/ic_close_12.svg?react";
import TextArea from "@/components/@common/TextArea/TextArea";
import { CONSTRAINTS } from "@/constants/constraints";
import * as S from "./ExhibitionLocationField.styles";
import ExhibitionPlaceSearch from "./ExhibitionPlaceSearch";
import type { ExhibitionLocationValue } from "./exhibitionLocation";

interface ExhibitionLocationFieldProps {
  value: ExhibitionLocationValue;
  onChange: (value: ExhibitionLocationValue) => void;
  onBlur?: () => void;
  errorMessage?: string;
}

const ExhibitionLocationField = ({
  value,
  onChange,
  onBlur,
  errorMessage,
}: ExhibitionLocationFieldProps) => {
  const nameId = useId();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const focusNameAfterSelectionRef = useRef(false);
  const isLinked = Boolean(value.placeId || value.placeUrl);

  useEffect(() => {
    if (isSearchOpen || !focusNameAfterSelectionRef.current) return;
    focusNameAfterSelectionRef.current = false;
    document.getElementById(nameId)?.focus();
  }, [isSearchOpen, nameId]);

  return (
    <S.Wrapper>
      <S.NameField $hasError={Boolean(errorMessage)}>
        <S.LabelRow $hasError={Boolean(errorMessage)}>
          <S.Label htmlFor={nameId}>전시 장소명</S.Label>
          {isLinked && errorMessage ? (
            <S.RequiredDot aria-hidden="true" />
          ) : null}
        </S.LabelRow>
        <TextArea
          id={nameId}
          size="medium"
          rows={1}
          value={value.placeName}
          placeholder={
            errorMessage
              ? "장소명을 입력해주세요."
              : "예) 홍익대학교 홍문관 4층"
          }
          maxLength={CONSTRAINTS.CREATE_SPACE.PLACE_NAME_MAX_LENGTH}
          errorMessage={errorMessage}
          onChange={(event) =>
            onChange({ ...value, placeName: event.target.value })
          }
          onBlur={onBlur}
        />
      </S.NameField>
      <S.ConnectionField>
        <S.ConnectionLabel>카카오맵 연결</S.ConnectionLabel>
        {isLinked ? (
          <S.Chip>
            등록된 장소
            <S.RemoveButton
              type="button"
              aria-label="카카오맵 연결 해제"
              onClick={() => onChange({ ...value, placeId: "", placeUrl: "" })}
            >
              <CloseIcon aria-hidden="true" />
            </S.RemoveButton>
          </S.Chip>
        ) : (
          <S.RegisterButton
            type="button"
            disabled={!value.placeName.trim()}
            aria-haspopup="dialog"
            onClick={() => setIsSearchOpen(true)}
          >
            장소 등록
          </S.RegisterButton>
        )}
      </S.ConnectionField>
      {isSearchOpen ? (
        <ExhibitionPlaceSearch
          onSelect={({ placeId, placeUrl }) => {
            focusNameAfterSelectionRef.current = true;
            onChange({ ...value, placeId, placeUrl });
          }}
          onClose={() => setIsSearchOpen(false)}
        />
      ) : null}
    </S.Wrapper>
  );
};
export default ExhibitionLocationField;
