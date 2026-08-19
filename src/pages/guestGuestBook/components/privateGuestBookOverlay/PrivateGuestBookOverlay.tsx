import IcLock from "@/assets/icons/ic_lock.svg?react";
import * as S from "./PrivateGuestBookOverlay.styles";

/** 방명록이 공개되지 않은 스페이스에서 목록 위에 겹쳐 보여주는 잠금 안내 */
const PrivateGuestBookOverlay = () => {
  return (
    <S.Circle role="status">
      <IcLock width={64} height={64} aria-hidden />
      <S.Text>공개되지 않은 방명록</S.Text>
    </S.Circle>
  );
};

export default PrivateGuestBookOverlay;
