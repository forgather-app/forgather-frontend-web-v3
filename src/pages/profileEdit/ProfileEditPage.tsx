import { useEffect, useId, useMemo, useState } from "react";
import IcPlusGray from "@/assets/icons/ic_plus_gray.svg?react";
import Button from "@/components/@common/Button/Button";
import NavigationBar from "@/components/@common/NavigationBar/NavigationBar";
import TextArea from "@/components/@common/TextArea/TextArea";
import TextField from "@/components/@common/TextField/TextField";
import { CONSTRAINTS } from "@/constants/constraints";
import ImageCropper from "./components/imageCropper/ImageCropper";
import * as S from "./ProfileEditPage.styles";

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

interface ProfileEditPageProps {
  /** 뒤로가기 핸들러 */
  onBack: () => void;
  /** 저장하기 클릭 핸들러 */
  onSave: (data: ProfileEditFormData) => void;
}

const ProfileEditPage = ({ onBack, onSave }: ProfileEditPageProps) => {
  const imageInputId = useId();
  // TODO: API 연동 시 기존 프로필 값으로 초기화
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [profileImage, setProfileImage] = useState<Blob | null>(null);
  /** 크롭 대기 중인 원본 이미지 URL — 값이 있으면 크롭 화면 표시 */
  const [cropSourceUrl, setCropSourceUrl] = useState<string | null>(null);

  const previewUrl = useMemo(
    () => (profileImage ? URL.createObjectURL(profileImage) : null),
    [profileImage],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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

  return (
    <S.PageWrapper>
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
            <TextField
              variant="count"
              value={nickname}
              maxCount={CONSTRAINTS.PROFILE.NICKNAME_MAX_LENGTH}
              placeholder="닉네임을 입력해주세요."
              onChange={(e) => setNickname(e.target.value)}
              aria-label="닉네임"
            />
          </S.FieldGroup>

          <S.FieldGroup>
            <S.FieldLabel>한 줄 소개</S.FieldLabel>
            <TextArea
              size="medium"
              rows={2}
              value={introduction}
              maxLength={CONSTRAINTS.PROFILE.INTRO_MAX_LENGTH}
              placeholder="작가님을 소개해주세요"
              onChange={(e) => setIntroduction(e.target.value)}
              aria-label="한 줄 소개"
            />
          </S.FieldGroup>

          <S.FieldGroup>
            <S.LinkLabel>링크</S.LinkLabel>
            <TextField
              variant="link"
              value={linkUrl}
              placeholder="작가님을 나타내는 링크를 추가해주세요"
              onChange={(e) => setLinkUrl(e.target.value)}
              aria-label="링크"
            />
          </S.FieldGroup>
        </S.FieldList>
      </S.ScrollArea>
      <S.Footer>
        <Button
          text="저장하기"
          onClick={() =>
            onSave({ nickname, introduction, linkUrl, profileImage })
          }
        />
      </S.Footer>
      {cropSourceUrl && (
        <ImageCropper imageUrl={cropSourceUrl} onSave={handleCropSave} />
      )}
    </S.PageWrapper>
  );
};

export default ProfileEditPage;
