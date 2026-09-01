import { Controller } from "react-hook-form";
import { useGetSpaceInformation } from "@/api/generated/space-스페이스";
import type { ApiResponseSpaceResponse, SpaceResponse } from "@/api/model";
import IcLock from "@/assets/icons/ic_lock.svg?react";
import Button from "@/components/@common/Button/Button";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import TextArea from "@/components/@common/TextArea/TextArea";
import TextField from "@/components/@common/TextField/TextField";
import Toggle from "@/components/@common/Toggle/Toggle";
import { CONSTRAINTS } from "@/constants/constraints";
import * as S from "@/pages/createSpace/CreateSpacePage.styles";
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
  } = useGetSpaceInformation<SpaceResponse>(spaceId, {
    query: {
      select: (response) =>
        (response as unknown as ApiResponseSpaceResponse).data ?? {},
    },
  });

  // TODO: 에러 UI 구현
  if (isSpaceError) {
    return;
  }

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
                placeholder="스페이스 명을 작성해주세요."
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
                placeholder="스페이스 설명을 작성해주세요."
                errorMessage={descriptionError}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-label="스페이스 소개"
              />
            )}
          />
        </S.FieldGroup>

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
      </S.Main>

      <S.Footer>
        <Button text="완료" type="submit" disabled={!isValid || isSubmitting} />
      </S.Footer>
    </S.Container>
  );
};

export default EditSpacePage;
