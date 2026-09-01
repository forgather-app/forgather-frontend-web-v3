import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Controller } from "react-hook-form";
import {
  useGetProfileSuspense,
  useUpdateProfile,
} from "@/api/generated/host-호스트";
import { useIssueHostProfileSignedUrls } from "@/api/generated/upload-파일-업로드";
import type {
  ApiResponseHostProfileResponse,
  ApiResponseIssueSignedUrlResponse,
} from "@/api/model";
import { uploadImageToSignedUrl } from "@/api/uploadImageToSignedUrl";
import IcPlusGray from "@/assets/icons/ic_plus_gray.svg?react";
import Button from "@/components/@common/Button/Button";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import TextArea from "@/components/@common/TextArea/TextArea";
import TextField from "@/components/@common/TextField/TextField";
import { CONSTRAINTS } from "@/constants/constraints";
import { ERROR_MESSAGES } from "@/constants/error";
import useNativePhotoPickerBridge from "@/hooks/@common/useNativePhotoPickerBridge";
import useSnackBar from "@/hooks/@common/useSnackBar";
import { getImageUrl } from "@/utils/getImageUrl";
import ImageCropper from "./components/imageCropper/ImageCropper";
import {
  type ProfileEditFormData,
  useProfileEditForm,
} from "./hooks/useProfileEditForm";
import * as S from "./ProfileEditPage.styles";

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();
  const { requestPhotoPicker } = useNativePhotoPickerBridge();
  const [isSaving, setIsSaving] = useState(false);

  const { data: profile } = useGetProfileSuspense({
    query: {
      select: (response) =>
        (response as unknown as ApiResponseHostProfileResponse).data,
    },
  });
  const { mutateAsync: issueSignedUrls } = useIssueHostProfileSignedUrls();
  const { mutateAsync: updateProfile } = useUpdateProfile();

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
    handleImageSelect,
    handleCropSave,
    handleCropClose,
  } = useProfileEditForm({
    nickname: profile?.nickname ?? "",
    introduction: profile?.introduction ?? "",
    linkUrl: profile?.linkUrl ?? "",
    pictureUrl: profile?.photoPath ? getImageUrl(profile.photoPath) : "",
  });

  const uploadProfileImage = async (image: Blob) => {
    const fileName = `${crypto.randomUUID()}.webp`;
    const signedUrlsResponse = await issueSignedUrls({
      data: { uploadFiles: [{ fileName, size: image.size }] },
    });
    const signedUrl = (
      signedUrlsResponse as unknown as ApiResponseIssueSignedUrlResponse
    ).data?.signedUrls?.[fileName];
    if (!signedUrl) throw new Error("업로드 URL을 발급받지 못했습니다");

    await uploadImageToSignedUrl(signedUrl, image, fileName);

    return { uploadFileName: fileName, capacity: image.size };
  };

  const handleAvatarClick = async () => {
    const [photo] = await requestPhotoPicker(1);
    handleImageSelect(photo?.blob ?? null);
  };

  const handleSave = async (formData: ProfileEditFormData) => {
    setIsSaving(true);
    try {
      const photo = formData.profileImage
        ? await uploadProfileImage(formData.profileImage)
        : undefined;

      await updateProfile({
        data: {
          nickname: formData.nickname,
          introduction: formData.introduction,
          linkUrl: formData.linkUrl,
          ...(photo && { photo }),
        },
      });
      navigate({ to: "/my-page" });
    } catch {
      showSnackBar(ERROR_MESSAGES.PROFILE_UPDATE_FAILED, "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <S.PageWrapper onSubmit={getSubmitHandler(handleSave)} noValidate>
      <NavigationBar
        title="프로필 설정"
        onBackClick={() => navigate({ to: "/my-page" })}
      />
      <S.ScrollArea>
        <S.ProfileGroup>
          <S.ProfileLabel>프로필</S.ProfileLabel>
          <S.AvatarLabel
            type="button"
            onClick={handleAvatarClick}
            aria-label="프로필 이미지 선택"
          >
            {previewUrl ? (
              <S.AvatarPreview
                src={previewUrl}
                alt="선택한 프로필 이미지 미리보기"
              />
            ) : (
              <IcPlusGray aria-hidden="true" />
            )}
          </S.AvatarLabel>
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
        <Button text="저장하기" type="submit" disabled={!isValid || isSaving} />
      </S.Footer>
      {cropSourceUrl && (
        <ImageCropper
          imageUrl={cropSourceUrl}
          onSave={handleCropSave}
          onClose={handleCropClose}
        />
      )}
    </S.PageWrapper>
  );
};

export default ProfileEditPage;
