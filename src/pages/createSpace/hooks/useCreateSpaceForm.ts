import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useCreate } from "@/api/generated/space-스페이스";
import type {
  ApiResponseCreateSpaceResponse,
  GuestBookWritingPolicy,
} from "@/api/model";
import {
  type ExhibitionLocationValue,
  toExhibitionLocationPayload,
  validateExhibitionLocation,
} from "@/components/@common/ExhibitionLocationField/exhibitionLocation";
import type { ExhibitionPeriodValue } from "@/components/@common/ExhibitionPeriodField/ExhibitionPeriodField";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "@/hooks/@common/useSnackBar";
import {
  validateSpaceDescriptionMaxLength,
  validateSpaceLinkNameMaxLength,
  validateSpaceLinkUrlFormat,
  validateSpaceNameMaxLength,
  validateSpaceNameRequired,
} from "@/pages/createSpace/utils/createSpaceValidation";
import { toDateOnlyString } from "@/utils/date";
import { validateGuestBookWritingPeriod } from "@/utils/guestBookWritingPolicy";

interface CreateSpaceFormValues {
  spaceName: string;
  description: string;
  linkUrl: string;
  linkName: string;
  exhibitionPeriod: ExhibitionPeriodValue;
  guestBookWritingPolicy: GuestBookWritingPolicy;
  exhibitionLocation: ExhibitionLocationValue;
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

const linkNameRules = {
  validate: {
    maxLength: validateSpaceLinkNameMaxLength,
  },
};

export const useCreateSpaceForm = () => {
  const { showSnackBar } = useSnackBar();
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors, touchedFields, isValid },
  } = useForm<CreateSpaceFormValues>({
    mode: "onChange",
    defaultValues: {
      guestBookWritingPolicy: "ALWAYS",
      spaceName: "",
      description: "",
      linkUrl: "",
      linkName: "",
      exhibitionPeriod: { startDate: null, endDate: null },
      exhibitionLocation: { placeName: "", placeId: "", placeUrl: "" },
    },
  });

  const policy = useWatch({ control, name: "guestBookWritingPolicy" });
  const period = useWatch({ control, name: "exhibitionPeriod" });
  const periodValidation = validateGuestBookWritingPeriod(policy, period);

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
  const linkUrlError = linkUrlFormatError;
  const linkNameError = errors.linkName?.message;

  // linkUrl은 onChange마다 형식을 검증하지 않고, blur 시점에만 검증해 에러를 노출함
  const handleLinkUrlBlur = (value: string) => {
    const result = validateSpaceLinkUrlFormat(value);
    setLinkUrlFormatError(result === true ? undefined : result);
  };

  const getSubmitHandler = (onSuccess: (spaceCode: string) => void) =>
    handleSubmit((values) => {
      const linkUrlValidation = validateSpaceLinkUrlFormat(values.linkUrl);
      if (linkUrlValidation !== true) {
        setLinkUrlFormatError(linkUrlValidation);
        return;
      }

      const { startDate, endDate } = values.exhibitionPeriod;

      createSpace(
        {
          data: {
            ...toExhibitionLocationPayload(values.exhibitionLocation),
            guestBookWritingPolicy: values.guestBookWritingPolicy,
            name: values.spaceName,
            description: values.description,
            isPublic: !isGuestBookPrivate,
            linkUrl: values.linkUrl.trim(),
            linkName: values.linkName.trim(),
            ...(startDate && endDate
              ? {
                  exhibitionStartDate: toDateOnlyString(startDate),
                  exhibitionEndDate: toDateOnlyString(endDate),
                }
              : {}),
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
    linkNameRules,
    exhibitionPeriodRules: {
      validate: (value: ExhibitionPeriodValue) =>
        validateGuestBookWritingPeriod(
          getValues("guestBookWritingPolicy"),
          value,
        ),
      deps: "guestBookWritingPolicy" as const,
    },
    guestBookWritingPolicyRules: {
      validate: (value: GuestBookWritingPolicy) =>
        validateGuestBookWritingPeriod(value, getValues("exhibitionPeriod")),
      deps: "exhibitionPeriod" as const,
    },
    isExhibitionPeriodComplete: !!period.startDate && !!period.endDate,
    exhibitionPeriodError:
      periodValidation === true ? undefined : periodValidation,
    exhibitionLocationRules: { validate: validateExhibitionLocation },
    exhibitionLocationError: errors.exhibitionLocation?.message,
    spaceNameError,
    descriptionError,
    linkNameError,
    linkUrlError,
    handleLinkUrlBlur,
    isValid: isValid && periodValidation === true,
    isGuestBookPrivate,
    setIsGuestBookPrivate,
    isSubmitting: isPending,
    getSubmitHandler,
  };
};
