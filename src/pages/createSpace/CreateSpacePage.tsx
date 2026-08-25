import { Controller } from "react-hook-form";
import IcLock from "@/assets/icons/ic_lock.svg?react";
import Button from "@/components/@common/Button/Button";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import TextArea from "@/components/@common/TextArea/TextArea";
import TextField from "@/components/@common/TextField/TextField";
import Toggle from "@/components/@common/Toggle/Toggle";
import { CONSTRAINTS } from "@/constants/constraints";
import * as S from "./CreateSpacePage.styles";
import { useCreateSpaceForm } from "./hooks/useCreateSpaceForm";

interface CreateSpacePageProps {
  /** 스페이스 생성 성공 시 호출되는 핸들러 (생성된 스페이스 코드 전달) */
  onSuccess: (spaceCode: string) => void;
}

const CreateSpacePage = ({ onSuccess }: CreateSpacePageProps) => {
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
  } = useCreateSpaceForm();

  return (
    <S.Container onSubmit={getSubmitHandler(onSuccess)} noValidate>
      <NavigationBar
        title="새 스페이스"
        onBackClick={() => window.history.back()}
      />
      <S.Title>스페이스를 소개해주세요!</S.Title>
      <S.Main>
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
                placeholder="작품 제목을 작성해주세요."
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
                placeholder="작품에 대한 설명을 작성해주세요."
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

export default CreateSpacePage;
