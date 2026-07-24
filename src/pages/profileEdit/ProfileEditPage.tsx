import { useId } from "react";
import { Controller } from "react-hook-form";
import IcPlusGray from "@/assets/icons/ic_plus_gray.svg?react";
import Button from "@/components/@common/Button/Button";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import TextArea from "@/components/@common/TextArea/TextArea";
import TextField from "@/components/@common/TextField/TextField";
import { CONSTRAINTS } from "@/constants/constraints";
import ImageCropper from "./components/imageCropper/ImageCropper";
import {
  type ProfileEditFormData,
  useProfileEditForm,
} from "./hooks/useProfileEditForm";
import * as S from "./ProfileEditPage.styles";

export type { ProfileEditFormData } from "./hooks/useProfileEditForm";

interface ProfileEditPageProps {
  /** 뒤로가기 핸들러 */
  onBack: () => void;
  /** 저장하기 클릭 핸들러 */
  onSave: (data: ProfileEditFormData) => void;
}

const ProfileEditPage = ({ onBack, onSave }: ProfileEditPageProps) => {
  const imageInputId = useId();
  const {
    control,
    nicknameRules,
    introductionRules,
    nicknameError,
    introductionError,
    isValid,
    previewUrl,
    cropSourceUrl,
    getSubmitHandler,
    handleImageChange,
    handleCropSave,
  } = useProfileEditForm();

  return (
    <S.PageWrapper onSubmit={getSubmitHandler(onSave)} noValidate>
      <NavigationBar title="프로필 설정" onBackClick={onBack} />
      <S.ScrollArea>
        <S.ProfileGroup>
          <S.ProfileLabel>프로필</S.ProfileLabel>
          <S.AvatarLabel htmlFor={imageInputId} aria-label="프로필 이미지 선택">
            {previewUrl ? (
              <S.AvatarPreview
                src={previewUrl}
                alt="선택한 프로필 이미지 미리보기"
              />
            ) : (
              <IcPlusGray aria-hidden="true" />
            )}
          </S.AvatarLabel>
          <S.HiddenInput
            id={imageInputId}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </S.ProfileGroup>

        <S.FieldList>
          <S.FieldGroup>
            <S.FieldLabel>닉네임</S.FieldLabel>
            <Controller
              control={control}
              name="nickname"
              rules={nicknameRules}
              render={({ field }) => (
                <TextField
                  variant="count"
                  value={field.value}
                  maxCount={CONSTRAINTS.PROFILE.NICKNAME_MAX_LENGTH}
                  placeholder="닉네임을 입력해주세요."
                  errorMessage={nicknameError}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  aria-label="닉네임"
                />
              )}
            />
          </S.FieldGroup>

          <S.FieldGroup>
            <S.FieldLabel>한 줄 소개</S.FieldLabel>
            <Controller
              control={control}
              name="introduction"
              rules={introductionRules}
              render={({ field }) => (
                <TextArea
                  size="medium"
                  rows={2}
                  value={field.value}
                  maxLength={CONSTRAINTS.PROFILE.INTRO_MAX_LENGTH}
                  placeholder="작가님을 소개해주세요"
                  errorMessage={introductionError}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  aria-label="한 줄 소개"
                />
              )}
            />
          </S.FieldGroup>

          <S.FieldGroup>
            <S.LinkLabel>링크</S.LinkLabel>
            <Controller
              control={control}
              name="linkUrl"
              render={({ field }) => (
                <TextField
                  variant="link"
                  value={field.value}
                  placeholder="작가님을 나타내는 링크를 추가해주세요"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  aria-label="링크"
                />
              )}
            />
          </S.FieldGroup>
        </S.FieldList>
      </S.ScrollArea>
      <S.Footer>
        <Button text="저장하기" type="submit" disabled={!isValid} />
      </S.Footer>
      {cropSourceUrl && (
        <ImageCropper imageUrl={cropSourceUrl} onSave={handleCropSave} />
      )}
    </S.PageWrapper>
  );
};

export default ProfileEditPage;
