import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreate } from "@/api/generated/space-스페이스";
import type { ApiResponseCreateSpaceResponse } from "@/api/model";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "@/hooks/@common/useSnackBar";
import {
  validateSpaceDescriptionMaxLength,
  validateSpaceLinkNameMaxLength,
  validateSpaceLinkPair,
  validateSpaceLinkUrlFormat,
  validateSpaceNameMaxLength,
  validateSpaceNameRequired,
} from "@/pages/createSpace/utils/createSpaceValidation";

interface CreateSpaceFormValues {
  spaceName: string;
  description: string;
  linkUrl: string;
  linkName: string;
}

const spaceNameRules = {
  validate: {
    required: validateSpaceNameRequired,
    maxLength: validateSpaceNameMaxLength,
  },
};

const descriptionRules = {
  validate: validateSpaceDescriptionMaxLength,
};

const linkUrlRules = {
  validate: { pair: validateSpaceLinkPair },
};

const linkNameRules = {
  validate: {
    maxLength: validateSpaceLinkNameMaxLength,
    pair: validateSpaceLinkPair,
  },
};

export const useCreateSpaceForm = () => {
  const { showSnackBar } = useSnackBar();
  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors, touchedFields, isValid },
  } = useForm<CreateSpaceFormValues>({
    mode: "onChange",
    defaultValues: {
      spaceName: "",
      description: "",
      linkUrl: "",
      linkName: "",
    },
  });

  const [isGuestBookPrivate, setIsGuestBookPrivate] = useState(false);
  const [linkUrlFormatError, setLinkUrlFormatError] = useState<
    string | undefined
  >(undefined);
  const { mutate: createSpace, isPending } = useCreate();

  const spaceNameError =
    errors.spaceName?.type === "required" && !touchedFields.spaceName
      ? undefined
      : errors.spaceName?.message;
  const descriptionError = errors.description?.message;
  // 형식 에러(blur 시점)를 우선 노출하고, 없으면 짝 검증(RHF) 에러를 노출함
  const linkUrlError = linkUrlFormatError ?? errors.linkUrl?.message;
  const linkNameError = errors.linkName?.message;

  // linkUrl은 onChange마다 형식을 검증하지 않고, blur 시점에만 검증해 에러를 노출함
  const handleLinkUrlBlur = (value: string) => {
    const result = validateSpaceLinkUrlFormat(value);
    setLinkUrlFormatError(result === true ? undefined : result);
  };

  // linkUrl/linkName은 서로 짝을 이뤄야 하므로, 한쪽이 바뀌면 둘 다 재검증한다
  const triggerLinkPair = () => {
    trigger(["linkUrl", "linkName"]);
  };

  const getSubmitHandler = (onSuccess: (spaceCode: string) => void) =>
    handleSubmit((values) => {
      const linkUrlValidation = validateSpaceLinkUrlFormat(values.linkUrl);
      if (linkUrlValidation !== true) {
        setLinkUrlFormatError(linkUrlValidation);
        return;
      }

      createSpace(
        {
          data: {
            name: values.spaceName,
            description: values.description,
            isPublic: !isGuestBookPrivate,
            linkUrl: values.linkUrl.trim(),
            linkName: values.linkName.trim(),
          },
        },
        {
          onSuccess: (response) => {
            // NOTE: BE 스펙상 응답 content-type이 `*/*`라 orval이 Blob으로 잘못 추론함.
            // 실제 응답 바디는 ApiResponseCreateSpaceResponse (JSON)이므로 캐스팅해서 사용
            const spaceCode = (
              response as unknown as ApiResponseCreateSpaceResponse
            ).data?.spaceCode;

            if (!spaceCode) {
              showSnackBar(ERROR_MESSAGES.SPACE_CREATE_FAILED, "error");
              return;
            }

            onSuccess(spaceCode);
          },
          onError: () =>
            showSnackBar(ERROR_MESSAGES.SPACE_CREATE_FAILED, "error"),
        },
      );
    });

  return {
    control,
    spaceNameRules,
    descriptionRules,
    linkUrlRules,
    linkNameRules,
    spaceNameError,
    descriptionError,
    linkNameError,
    linkUrlError,
    handleLinkUrlBlur,
    triggerLinkPair,
    isValid,
    isGuestBookPrivate,
    setIsGuestBookPrivate,
    isSubmitting: isPending,
    getSubmitHandler,
  };
};
