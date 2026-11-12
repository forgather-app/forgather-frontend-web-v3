import { useState } from "react";
import { useController, useForm } from "react-hook-form";
import { useCreate } from "@/api/generated/space-스페이스";
import type {
  ApiResponseCreateSpaceResponse,
  GuestBookWritingPolicy,
} from "@/api/model";
import {
  type LocationInputValue,
  toLocationInputPayload,
  validateLocationInput,
} from "@/components/@common/LocationInput/locationValue";
import type { PeriodInputValue } from "@/components/@common/PeriodInput/PeriodInput";
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
  exhibitionPeriod: PeriodInputValue;
  guestBookWritingPolicy: GuestBookWritingPolicy;
  exhibitionLocation: LocationInputValue;
  isGuestBookPrivate: boolean;
}

const introductionFields = [
  "spaceName",
  "description",
  "linkUrl",
  "linkName",
] as const;

export const useCreateSpaceForm = () => {
  const { showSnackBar } = useSnackBar();
  const {
    control,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, touchedFields, isValid, isSubmitting },
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
      isGuestBookPrivate: false,
    },
  });

  // 단계가 바뀌어도 등록을 유지해 최종 제출에서 화면에 없는 필드까지 검증한다.
  const { field: spaceName } = useController({
    control,
    name: "spaceName",
    rules: {
      validate: {
        required: validateSpaceNameRequired,
        maxLength: validateSpaceNameMaxLength,
      },
    },
  });
  const { field: description } = useController({
    control,
    name: "description",
    rules: { validate: validateSpaceDescriptionMaxLength },
  });
  const { field: linkUrl } = useController({ control, name: "linkUrl" });
  const { field: linkName } = useController({
    control,
    name: "linkName",
    rules: { validate: validateSpaceLinkNameMaxLength },
  });
  const { field: exhibitionPeriod } = useController({
    control,
    name: "exhibitionPeriod",
    rules: {
      validate: (value) =>
        validateGuestBookWritingPeriod(
          getValues("guestBookWritingPolicy"),
          value,
        ),
      deps: "guestBookWritingPolicy",
    },
  });
  const { field: guestBookWritingPolicy } = useController({
    control,
    name: "guestBookWritingPolicy",
    rules: {
      validate: (value) =>
        validateGuestBookWritingPeriod(value, getValues("exhibitionPeriod")),
      deps: "exhibitionPeriod",
    },
  });
  const { field: exhibitionLocation } = useController({
    control,
    name: "exhibitionLocation",
    rules: { validate: validateLocationInput },
  });
  const { field: guestBookPrivate } = useController({
    control,
    name: "isGuestBookPrivate",
  });
  const policy = guestBookWritingPolicy.value;
  const period = exhibitionPeriod.value;
  const periodValidation = validateGuestBookWritingPeriod(policy, period);

  const [linkUrlError, setLinkUrlError] = useState<string>();
  const { mutateAsync: createSpace, isPending } = useCreate();

  const isSpaceNameValid =
    validateSpaceNameRequired(spaceName.value) === true &&
    validateSpaceNameMaxLength(spaceName.value) === true;
  const spaceNameError =
    errors.spaceName?.type === "required" && !touchedFields.spaceName
      ? undefined
      : errors.spaceName?.message;

  // linkUrl은 onChange마다 형식을 검증하지 않고, blur 시점에만 검증해 에러를 노출함
  const validateLinkUrl = (value: string) => {
    const result = validateSpaceLinkUrlFormat(value);
    setLinkUrlError(result === true ? undefined : result);
    return result === true;
  };

  const validateIntroduction = async () => {
    const areFieldsValid = await trigger(introductionFields, {
      shouldTouch: true,
    });
    const isLinkValid = validateLinkUrl(getValues("linkUrl"));
    return areFieldsValid && isLinkValid;
  };

  const getSubmitHandler = (onSuccess: (spaceCode: string) => void) =>
    handleSubmit(async (values) => {
      if (!validateLinkUrl(values.linkUrl)) return;

      const { startDate, endDate } = values.exhibitionPeriod;

      await createSpace(
        {
          data: {
            ...toLocationInputPayload(values.exhibitionLocation),
            guestBookWritingPolicy: values.guestBookWritingPolicy,
            name: values.spaceName,
            description: values.description,
            isPublic: !values.isGuestBookPrivate,
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
      ).catch(() => {
        // 요청 실패 안내는 mutation의 onError에서 처리한다.
      });
    });

  return {
    spaceName,
    description,
    linkUrl,
    linkName,
    exhibitionPeriod,
    exhibitionLocation,
    guestBookWritingPolicy,
    guestBookPrivate,
    isExhibitionPeriodComplete: !!period.startDate && !!period.endDate,
    exhibitionPeriodError:
      periodValidation === true ? undefined : periodValidation,
    exhibitionLocationError: errors.exhibitionLocation?.message,
    isSpaceNameValid,
    spaceNameError,
    descriptionError: errors.description?.message,
    linkNameError: errors.linkName?.message,
    linkUrlError,
    validateLinkUrl,
    validateIntroduction,
    isValid: isValid && periodValidation === true,
    isSubmitting: isSubmitting || isPending,
    getSubmitHandler,
  };
};
