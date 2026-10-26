import { useRef } from "react";
import { Controller } from "react-hook-form";
import { useGetSpaceInformation } from "@/api/generated/space-스페이스";
import type { ApiResponseSpaceResponse, SpaceResponse } from "@/api/model";
import IcLock from "@/assets/icons/ic_lock.svg?react";
import Button from "@/components/@common/Button/Button";
import GuestBookWritingPolicyField from "@/components/@common/GuestBookWritingPolicyField/GuestBookWritingPolicyField";
import LocationInput from "@/components/@common/LocationInput/LocationInput";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import PeriodInput from "@/components/@common/PeriodInput/PeriodInput";
import TextArea from "@/components/@common/TextArea/TextArea";
import TextField from "@/components/@common/TextField/TextField";
import Toggle from "@/components/@common/Toggle/Toggle";
import { CONSTRAINTS } from "@/constants/constraints";
import * as S from "@/pages/createSpace/CreateSpacePage.styles";
import { throwIfRoutableError } from "@/utils/throwIfRoutableError";
import { useEditSpaceForm } from "./hooks/useEditSpaceForm";

interface EditSpacePageProps {
  /** 스페이스 ID */
  spaceId: string;
  /** 스페이스 수정 성공 시 호출되는 핸들러 */
  onSuccess: () => void;
}

const EditSpacePage = ({ spaceId, onSuccess }: EditSpacePageProps) => {
  const {
    data: space,
    isPending: isSpacePending,
    isError: isSpaceError,
    error: spaceError,
  } = useGetSpaceInformation<SpaceResponse>(spaceId, {
    query: {
      select: (response) =>
        (response as unknown as ApiResponseSpaceResponse).data ?? {},
    },
  });

  // 에러가 있으면 항상 throw하므로 아래 return은 타입 좁히기 용도일 뿐 실제로 렌더링되지 않는다
  throwIfRoutableError(spaceError);
  if (isSpaceError) return null;

  if (isSpacePending) {
    return null;
  }

  return (
    <EditSpaceForm spaceId={spaceId} space={space} onSuccess={onSuccess} />
  );
};

interface EditSpaceFormProps {
  spaceId: string;
  space: SpaceResponse;
  onSuccess: () => void;
}

const EditSpaceForm = ({ spaceId, space, onSuccess }: EditSpaceFormProps) => {
  const {
    control,
    spaceNameRules,
    descriptionRules,
    linkNameRules,
    exhibitionLocationRules,
    exhibitionPeriodRules,
    guestBookWritingPolicyRules,
    exhibitionPeriodError,
    isExhibitionPeriodComplete,
    exhibitionLocationError,
    spaceNameError,
    descriptionError,
    linkNameError,
    linkUrlError,
    handleLinkUrlBlur,
    isValid,
    isGuestBookPrivate,
    setIsGuestBookPrivate,
    isSubmitting,
    getSubmitHandler,
  } = useEditSpaceForm(spaceId, space);

  const periodRef = useRef<HTMLDivElement>(null);

  return (
    <S.Container onSubmit={getSubmitHandler(onSuccess)} noValidate>
      <NavigationBar
        title="스페이스 수정"
        onBackClick={() => window.history.back()}
      />
      <S.Main>
        <S.Title>스페이스를 소개해주세요!</S.Title>
        <S.FieldGroup>
          <S.FieldLabelRow>
            <S.Label>스페이스명</S.Label>
            <S.RequiredDot aria-hidden="true" />
          </S.FieldLabelRow>
          <Controller
            control={control}
            name="spaceName"
            rules={spaceNameRules}
            render={({ field }) => (
              <TextField
                variant="count"
                value={field.value}
                maxCount={CONSTRAINTS.CREATE_SPACE.NAME_MAX_LENGTH}
                placeholder="예) 2026 졸업전시, 나의 여름"
                errorMessage={spaceNameError}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-label="스페이스명"
              />
            )}
          />
        </S.FieldGroup>

        <S.FieldGroup>
          <S.FieldLabelRow>
            <S.Label>스페이스 소개</S.Label>
          </S.FieldLabelRow>
          <Controller
            control={control}
            name="description"
            rules={descriptionRules}
            render={({ field }) => (
              <TextArea
                value={field.value}
                maxLength={CONSTRAINTS.CREATE_SPACE.DESCRIPTION_MAX_LENGTH}
                placeholder={
                  "전시 소개나 관람 안내를 자유롭게 적어주세요.\n운영 시간, 작가 상주 시간, 환영 인사도 좋아요."
                }
                errorMessage={descriptionError}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-label="스페이스 소개"
              />
            )}
          />
        </S.FieldGroup>

        <S.FieldGroup ref={periodRef}>
          <S.FieldLabelRow>
            <S.Label>전시 기간</S.Label>
          </S.FieldLabelRow>
          <Controller
            control={control}
            name="exhibitionPeriod"
            rules={exhibitionPeriodRules}
            render={({ field }) => (
              <PeriodInput
                errorMessage={exhibitionPeriodError}
                value={field.value}
                onChange={field.onChange}
                highlightToday={true}
              />
            )}
          />
        </S.FieldGroup>

        <Controller
          control={control}
          name="exhibitionLocation"
          rules={exhibitionLocationRules}
          render={({ field }) => (
            <LocationInput
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              errorMessage={exhibitionLocationError}
            />
          )}
        />

        <S.FieldGroup>
          <S.FieldLabelRow>
            <S.Label>링크</S.Label>
          </S.FieldLabelRow>
          <Controller
            control={control}
            name="linkUrl"
            render={({ field }) => (
              <TextField
                variant="link"
                value={field.value}
                placeholder="전시와 관련된 링크를 첨부해주세요."
                errorMessage={linkUrlError}
                onChange={field.onChange}
                onBlur={() => {
                  field.onBlur();
                  handleLinkUrlBlur(field.value);
                }}
                aria-label="링크 URL"
              />
            )}
          />
          <Controller
            control={control}
            name="linkName"
            rules={linkNameRules}
            render={({ field }) => (
              <TextField
                variant="count"
                value={field.value}
                maxCount={CONSTRAINTS.CREATE_SPACE.LINK_NAME_MAX_LENGTH}
                placeholder="링크 제목을 작성해주세요."
                errorMessage={linkNameError}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-label="링크 제목"
              />
            )}
          />
        </S.FieldGroup>

        <Controller
          control={control}
          name="guestBookWritingPolicy"
          rules={guestBookWritingPolicyRules}
          render={({ field }) => (
            <GuestBookWritingPolicyField
              value={field.value}
              onChange={(policy) => {
                field.onChange(policy);
                if (
                  policy === "EXHIBITION_PERIOD" &&
                  !isExhibitionPeriodComplete
                ) {
                  periodRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }}
            />
          )}
        />
        <S.FieldGroup>
          <S.FieldLabelRow>
            <S.Label>방명록 공개 설정</S.Label>
          </S.FieldLabelRow>
          <S.ToggleRow>
            <S.ToggleLabelGroup>
              <IcLock aria-hidden="true" width={20} height={20} />
              <S.ToggleLabel>방명록 나만 보기</S.ToggleLabel>
            </S.ToggleLabelGroup>
            <Toggle
              checked={isGuestBookPrivate}
              onChange={setIsGuestBookPrivate}
              ariaLabel="방명록 나만 보기"
            />
          </S.ToggleRow>
        </S.FieldGroup>
      </S.Main>

      <S.Footer>
        <Button text="완료" type="submit" disabled={!isValid || isSubmitting} />
      </S.Footer>
    </S.Container>
  );
};

export default EditSpacePage;
