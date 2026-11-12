import { useEffect, useId, useRef, useState } from "react";
import CheckIcon from "@/assets/icons/ic_location_connected.svg?react";
import TextField from "@/components/@common/TextField/TextField";
import { CONSTRAINTS } from "@/constants/constraints";
import * as S from "./LocationInput.styles";
import type { LocationInputValue } from "./locationValue";
import PlaceSearch from "./PlaceSearch";

interface LocationInputProps {
  value: LocationInputValue;
  onChange: (value: LocationInputValue) => void;
  onBlur?: () => void;
  errorMessage?: string;
}

const LocationInput = ({
  value,
  onChange,
  onBlur,
  errorMessage,
}: LocationInputProps) => {
  const nameId = useId();
  const linkedStatusId = useId();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const linkedPlaceRef = useRef<HTMLDivElement>(null);
  const focusLinkedPlaceAfterSelectionRef = useRef(false);
  const isLinked = Boolean(value.placeId || value.placeUrl);

  useEffect(() => {
    if (isSearchOpen || !focusLinkedPlaceAfterSelectionRef.current) return;
    focusLinkedPlaceAfterSelectionRef.current = false;
    linkedPlaceRef.current?.focus({ preventScroll: true });
  }, [isSearchOpen]);

  return (
    <S.Wrapper>
      <S.NameField>
        <S.LabelRow>
          <S.Label htmlFor={nameId}>전시 장소</S.Label>
          {isLinked && errorMessage ? (
            <S.RequiredDot aria-hidden="true" />
          ) : null}
        </S.LabelRow>
        <TextField
          id={nameId}
          variant="count"
          size="large"
          value={value.placeName}
          placeholder="장소명을 입력해주세요"
          maxCount={CONSTRAINTS.CREATE_SPACE.PLACE_NAME_MAX_LENGTH}
          errorMessage={errorMessage}
          onChange={(event) =>
            onChange({ ...value, placeName: event.target.value })
          }
          onBlur={onBlur}
        />
      </S.NameField>
      {isLinked ? (
        <S.ConnectionRow>
          <S.ConnectedStatus
            ref={linkedPlaceRef}
            role="group"
            aria-labelledby={linkedStatusId}
            tabIndex={-1}
          >
            <CheckIcon aria-hidden="true" />
            <span id={linkedStatusId}>카카오맵 연동 완료</span>
          </S.ConnectedStatus>
          <S.ConnectionButton
            type="button"
            onClick={() => onChange({ ...value, placeId: "", placeUrl: "" })}
          >
            해제하기
          </S.ConnectionButton>
        </S.ConnectionRow>
      ) : (
        <S.ConnectionButton
          type="button"
          disabled={!value.placeName.trim()}
          aria-haspopup="dialog"
          onClick={() => setIsSearchOpen(true)}
        >
          카카오맵 연동하기
        </S.ConnectionButton>
      )}
      {isSearchOpen ? (
        <PlaceSearch
          onSelect={({ placeId, placeUrl }) => {
            focusLinkedPlaceAfterSelectionRef.current = true;
            onChange({ ...value, placeId, placeUrl });
          }}
          onClose={() => setIsSearchOpen(false)}
        />
      ) : null}
    </S.Wrapper>
  );
};
export default LocationInput;
