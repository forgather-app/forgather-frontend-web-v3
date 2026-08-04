import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  validateProductDescriptionMaxLength,
  validateProductTitleMaxLength,
  validateProductTitleRequired,
} from "@/pages/createProduct/utils/createProductValidation";

export interface CreateProductFormData {
  /** 작품 제목 */
  title: string;
  /** 작품 소개 */
  description: string;
  /** 작품 사진 목록 (최대 10장) */
  photos: File[];
  /** 유튜브 영상 링크 */
  videoUrl: string;
}

interface CreateProductFormValues {
  title: string;
  description: string;
  videoUrl: string;
}

/** 작품 제목 필드 검증 규칙 — 필수 입력(blur 후 노출) + 최대 글자 수(실시간 노출) */
const titleRules = {
  validate: {
    required: validateProductTitleRequired,
    maxLength: validateProductTitleMaxLength,
  },
};

/** 작품 소개 필드 검증 규칙 — 최대 글자 수(실시간 노출) */
const descriptionRules = {
  validate: validateProductDescriptionMaxLength,
};

/** 작품 등록 폼 상태(react-hook-form)와 사진 목록 상태를 관리하는 훅 */
export const useCreateProductForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<CreateProductFormValues>({
    mode: "onChange",
    defaultValues: { title: "", description: "", videoUrl: "" },
  });

  const [photos, setPhotos] = useState<File[]>([]);

  // 필수값 미입력 에러는 blur로 터치된 이후에만 노출, 글자 수 초과 에러는 항상 즉시 노출
  const titleError =
    errors.title?.type === "required" && !touchedFields.title
      ? undefined
      : errors.title?.message;
  const descriptionError = errors.description?.message;

  const getSubmitHandler = (onNext: (data: CreateProductFormData) => void) =>
    handleSubmit((values) => {
      onNext({ ...values, photos });
    });

  return {
    control,
    titleRules,
    descriptionRules,
    titleError,
    descriptionError,
    isValid,
    photos,
    setPhotos,
    getSubmitHandler,
  };
};
