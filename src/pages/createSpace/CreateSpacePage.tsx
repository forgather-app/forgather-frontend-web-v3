import { useRef } from "react";
import { Controller } from "react-hook-form";
import IcLock from "@/assets/icons/ic_lock.svg?react";
import Button from "@/components/@common/Button/Button";
import ExhibitionLocationField from "@/components/@common/ExhibitionLocationField/ExhibitionLocationField";
import ExhibitionPeriodField from "@/components/@common/ExhibitionPeriodField/ExhibitionPeriodField";
import GuestBookWritingPolicyField from "@/components/@common/GuestBookWritingPolicyField/GuestBookWritingPolicyField";
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
  } = useCreateSpaceForm();

  const periodRef = useRef<HTMLDivElement>(null);

  return (
    <S.Container onSubmit={getSubmitHandler(onSuccess)} noValidate>
      <NavigationBar
        title="새 스페이스"
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
              <ExhibitionPeriodField
                errorMessage={exhibitionPeriodError}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </S.FieldGroup>

        <Controller
          control={control}
          name="exhibitionLocation"
          rules={exhibitionLocationRules}
          render={({ field }) => (
            <ExhibitionLocationField
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

export default CreateSpacePage;
