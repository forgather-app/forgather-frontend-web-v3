import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  validateIntroductionMaxLength,
  validateNicknameMaxLength,
  validateNicknameRequired,
} from "@/pages/profileEdit/utils/profileEditValidation";

export interface ProfileEditFormData {
  /** 닉네임 */
  nickname: string;
  /** 한 줄 소개 */
  introduction: string;
  /** 링크 URL */
  linkUrl: string;
  /** 프로필 이미지 (미선택 시 null) */
  profileImage: Blob | null;
}

interface ProfileEditFormValues {
  nickname: string;
  introduction: string;
  linkUrl: string;
}

export interface ProfileEditFormDefaultValues {
  /** 닉네임 */
  nickname: string;
  /** 한 줄 소개 */
  introduction: string;
  /** 링크 URL */
  linkUrl: string;
  /** 기존 프로필 이미지 URL (없으면 빈 문자열) */
  pictureUrl: string;
}

/** 닉네임 필드 검증 규칙 — 필수 입력(blur 후 노출) + 최대 글자 수(실시간 노출) */
const nicknameRules = {
  validate: {
    required: validateNicknameRequired,
    maxLength: validateNicknameMaxLength,
  },
};

/** 한 줄 소개 필드 검증 규칙 — 최대 글자 수(실시간 노출) */
const introductionRules = {
  validate: validateIntroductionMaxLength,
};

/** 프로필 수정 폼 상태(react-hook-form) 및 이미지 크롭 플로우를 관리하는 훅 */
export const useProfileEditForm = (
  defaultValues?: ProfileEditFormDefaultValues,
) => {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<ProfileEditFormValues>({
    mode: "onChange",
    defaultValues: {
      nickname: defaultValues?.nickname ?? "",
      introduction: defaultValues?.introduction ?? "",
      linkUrl: defaultValues?.linkUrl ?? "",
    },
  });

  const [profileImage, setProfileImage] = useState<Blob | null>(null);
  /** 크롭 대기 중인 원본 이미지 URL — 값이 있으면 크롭 화면 표시 */
  const [cropSourceUrl, setCropSourceUrl] = useState<string | null>(null);

  const previewUrl = useMemo(
    () =>
      profileImage
        ? URL.createObjectURL(profileImage)
        : defaultValues?.pictureUrl || null,
    [profileImage, defaultValues?.pictureUrl],
  );

  useEffect(() => {
    return () => {
      if (profileImage && previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl, profileImage]);

  useEffect(() => {
    return () => {
      if (cropSourceUrl) URL.revokeObjectURL(cropSourceUrl);
    };
  }, [cropSourceUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setCropSourceUrl(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleCropSave = (image: Blob) => {
    setProfileImage(image);
    setCropSourceUrl(null);
  };

  // 필수값 미입력 에러는 blur로 터치된 이후에만 노출, 글자 수 초과 에러는 항상 즉시 노출
  const nicknameError =
    errors.nickname?.type === "required" && !touchedFields.nickname
      ? undefined
      : errors.nickname?.message;
  const introductionError = errors.introduction?.message;

  const getSubmitHandler = (onSave: (data: ProfileEditFormData) => void) =>
    handleSubmit((values) => {
      onSave({ ...values, profileImage });
    });

  return {
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
  };
};
