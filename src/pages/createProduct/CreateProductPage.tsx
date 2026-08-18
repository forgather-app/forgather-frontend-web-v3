import { Controller } from "react-hook-form";
import IcPhoto from "@/assets/icons/ic_photo.svg?react";
import Button from "@/components/@common/Button/Button";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import PhotoInput from "@/components/@common/photoInput/PhotoInput";
import TextArea from "@/components/@common/TextArea/TextArea";
import TextField from "@/components/@common/TextField/TextField";
import { CONSTRAINTS } from "@/constants/constraints";
import * as S from "./CreateProductPage.styles";
import { useCreateProductForm } from "./hooks/useCreateProductForm";

interface CreateProductPageProps {
  /** 작품을 등록할 스페이스 코드 */
  spaceCode: string;
  /** 뒤로가기 핸들러 */
  onBack: () => void;
  /** 작품 등록 성공 핸들러 */
  onSuccess: () => void;
}

const CreateProductPage = ({
  spaceCode,
  onBack,
  onSuccess,
}: CreateProductPageProps) => {
  const {
    control,
    titleRules,
    authorNameRules,
    descriptionRules,
    titleError,
    authorNameError,
    descriptionError,
    isValid,
    photos,
    setPhotos,
    isSubmitting,
    getSubmitHandler,
  } = useCreateProductForm(spaceCode);

  return (
    <S.PageWrapper onSubmit={getSubmitHandler(onSuccess)} noValidate>
      <NavigationBar title="작품 등록하기" onBackClick={onBack} />
      <S.ScrollArea>
        <S.Title>{"작품 정보를\n입력해 주세요!"}</S.Title>
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

        {/* TODO: 디자인 교체 필요 — 현재 Figma 시안이 없어 기존 TextField(count variant)로 임시 구현 */}
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
          <S.Label>{`사진(최대 ${CONSTRAINTS.PRODUCT.MAX_PHOTO_COUNT}장)`}</S.Label>
          <PhotoInput
            photos={photos}
            maxCount={CONSTRAINTS.PRODUCT.MAX_PHOTO_COUNT}
            onChange={setPhotos}
            icon={<IcPhoto aria-hidden="true" width={24} height={24} />}
            showCoverBadge
            addButtonAriaLabel="작품 사진 추가"
            listAriaLabel="첨부한 작품 사진"
          />
        </S.FieldGroup>

        <S.FieldGroup>
          <S.Label>영상</S.Label>
          <Controller
            control={control}
            name="videoUrl"
            render={({ field }) => (
              <TextField
                variant="link"
                value={field.value}
                placeholder="유튜브 링크를 입력해주세요"
                onChange={field.onChange}
                onBlur={field.onBlur}
                aria-label="영상 링크"
              />
            )}
          />
        </S.FieldGroup>
      </S.ScrollArea>
      <S.Footer>
        <Button text="다음" type="submit" disabled={!isValid || isSubmitting} />
      </S.Footer>
    </S.PageWrapper>
  );
};

export default CreateProductPage;
