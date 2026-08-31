import { Controller } from "react-hook-form";
import { withApiVersion } from "@/api/apiVersion";
import { useGet } from "@/api/generated/product-전시-작품";
import type { ApiResponseProductResponse, ProductResponse } from "@/api/model";
import IcPhoto from "@/assets/icons/ic_photo.svg?react";
import Button from "@/components/@common/Button/Button";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import PhotoInput from "@/components/@common/photoInput/PhotoInput";
import TextArea from "@/components/@common/TextArea/TextArea";
import TextField from "@/components/@common/TextField/TextField";
import { CONSTRAINTS } from "@/constants/constraints";
import * as S from "./EditArtworkPage.styles";
import { useEditArtworkForm } from "./hooks/useEditArtworkForm";

interface EditArtworkPageProps {
  /** 작품이 속한 스페이스 코드 */
  spaceId: string;
  /** 수정할 작품 ID */
  artworkId: number;
  /** 뒤로가기 핸들러 */
  onBack: () => void;
  /** 작품 수정 성공 핸들러 */
  onSuccess: () => void;
}

const EditArtworkPage = ({
  spaceId,
  artworkId,
  onBack,
  onSuccess,
}: EditArtworkPageProps) => {
  const {
    data: product,
    isPending,
    isError,
  } = useGet<ProductResponse>(spaceId, artworkId, {
    query: {
      select: (response) =>
        // TODO: 응답 content-type이 `*/*`로 내려와 orval이 실제 스키마 대신 Blob으로 추론함 — 백엔드가 application/json으로 명시하면 캐스팅 제거 가능
        (response as unknown as ApiResponseProductResponse).data ?? {},
    },
    request: withApiVersion(1),
  });

  if (isPending || isError) {
    // TODO: 로딩/에러 UI — ArtworkDetailPage와 동일한 스켈레톤/에러 패턴 적용 검토
    return (
      <>
        <NavigationBar title="작품 수정하기" onBackClick={onBack} />
        {isError && <S.Subtitle>작품 정보를 불러오지 못했어요.</S.Subtitle>}
      </>
    );
  }

  return (
    <EditArtworkForm
      spaceId={spaceId}
      artworkId={artworkId}
      product={product}
      onBack={onBack}
      onSuccess={onSuccess}
    />
  );
};

interface EditArtworkFormProps {
  spaceId: string;
  artworkId: number;
  product: ProductResponse;
  onBack: () => void;
  onSuccess: () => void;
}

const EditArtworkForm = ({
  spaceId,
  artworkId,
  product,
  onBack,
  onSuccess,
}: EditArtworkFormProps) => {
  const {
    control,
    titleRules,
    authorNameRules,
    descriptionRules,
    videoUrlRules,
    titleError,
    authorNameError,
    descriptionError,
    videoUrlError,
    isValid,
    existingPhotos,
    removeExistingPhoto,
    photos,
    setPhotos,
    isSubmitting,
    getSubmitHandler,
  } = useEditArtworkForm(spaceId, artworkId, product);

  return (
    <S.PageWrapper onSubmit={getSubmitHandler(onSuccess)} noValidate>
      <NavigationBar title="작품 수정하기" onBackClick={onBack} />
      <S.ScrollArea>
        <S.TitleGroup>
          <S.Title>{"작품 정보를\n입력해 주세요!"}</S.Title>
          <S.Subtitle>작품은 3개까지 등록할 수 있어요.</S.Subtitle>
        </S.TitleGroup>

        <S.FieldGroup>
          <S.Label>작가명</S.Label>
          <Controller
            control={control}
            name="authorName"
            rules={authorNameRules}
            render={({ field }) => (
              <TextField
                variant="count"
                value={field.value}
                maxCount={CONSTRAINTS.PRODUCT.AUTHOR_NAME_MAX_LENGTH}
                placeholder="작가명을 입력해주세요."
                errorMessage={authorNameError}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-label="작가명"
              />
            )}
          />
        </S.FieldGroup>

        <S.FieldGroup>
          <S.LabelRow>
            <S.Label>작품 제목</S.Label>
            <S.RequiredDot aria-hidden="true" />
          </S.LabelRow>
          <Controller
            control={control}
            name="title"
            rules={titleRules}
            render={({ field }) => (
              <TextField
                variant="count"
                value={field.value}
                maxCount={CONSTRAINTS.PRODUCT.TITLE_MAX_LENGTH}
                placeholder="작품 제목을 작성해주세요."
                errorMessage={titleError}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-label="작품 제목"
              />
            )}
          />
        </S.FieldGroup>

        <S.FieldGroup>
          <S.Label>작품 소개</S.Label>
          <Controller
            control={control}
            name="description"
            rules={descriptionRules}
            render={({ field }) => (
              <TextArea
                value={field.value}
                maxLength={CONSTRAINTS.PRODUCT.DESCRIPTION_MAX_LENGTH}
                placeholder="작품에 대한 설명을 작성해주세요."
                errorMessage={descriptionError}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-label="작품 소개"
              />
            )}
          />
        </S.FieldGroup>

        <S.FieldGroup>
          <S.Label>영상</S.Label>
          <Controller
            control={control}
            name="videoUrl"
            rules={videoUrlRules}
            render={({ field }) => (
              <TextField
                variant="link"
                value={field.value}
                maxLength={CONSTRAINTS.PRODUCT.VIDEO_URL_MAX_LENGTH}
                placeholder="유튜브 링크를 입력해주세요"
                errorMessage={videoUrlError}
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-label="영상 링크"
              />
            )}
          />
        </S.FieldGroup>

        <S.FieldGroup>
          <S.Label>{`사진(최대 ${CONSTRAINTS.PRODUCT.MAX_PHOTO_COUNT}장)`}</S.Label>
          <PhotoInput
            photos={photos}
            existingPhotos={existingPhotos}
            onRemoveExisting={removeExistingPhoto}
            maxCount={CONSTRAINTS.PRODUCT.MAX_PHOTO_COUNT}
            onChange={setPhotos}
            icon={<IcPhoto aria-hidden="true" width={40} height={40} />}
            showCoverBadge
            addButtonAriaLabel="작품 사진 추가"
            listAriaLabel="첨부한 작품 사진"
          />
        </S.FieldGroup>
      </S.ScrollArea>
      <S.Footer>
        <Button
          text="등록하기"
          type="submit"
          disabled={!isValid || isSubmitting}
        />
      </S.Footer>
    </S.PageWrapper>
  );
};

export default EditArtworkPage;
