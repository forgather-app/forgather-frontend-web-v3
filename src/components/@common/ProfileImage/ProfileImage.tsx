import profileFallback from "@/assets/icons/profile.svg";
import { handleImageError } from "@/utils/handleImageError";
import * as S from "./ProfileImage.styles";

interface ProfileImageProps {
  /** 프로필 이미지 URL. 값이 없거나 로드에 실패하면 기본 이미지로 대체됩니다. */
  src?: string | null;
  /** 이미지 지름(px). 기본값 40 */
  size?: number;
  /** 대체 텍스트. 장식용 이미지라면 빈 문자열(기본값)을 사용합니다. */
  alt?: string;
  /** 외부 스타일 오버라이드용 className */
  className?: string;
}

/**
 * 원형 프로필 이미지.
 *
 * `src`가 없거나 이미지 로드에 실패하면 기본 프로필 이미지(`profile.svg`)를 노출합니다.
 */
const ProfileImage = ({
  src,
  size = 40,
  alt = "",
  className,
}: ProfileImageProps) => {
  return (
    <S.Image
      src={src || profileFallback}
      alt={alt}
      $size={size}
      className={className}
      aria-hidden={alt === "" ? "true" : undefined}
      onError={(e) => handleImageError(e, profileFallback)}
    />
  );
};

export default ProfileImage;
