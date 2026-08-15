import IcClose from "@/assets/icons/ic_close.svg?react";
import IcLink from "@/assets/icons/ic_link.svg?react";
import IcQr from "@/assets/icons/ic_qr.svg?react";
import Button from "@/components/@common/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import * as S from "./ShareModal.styles";

interface ShareModalProps {
  /** 모달 열림 여부 */
  isOpen: boolean;
  /** 모달을 닫을 때 호출되는 콜백 */
  onClose: () => void;
  /** 카카오톡으로 보내기 클릭 핸들러 */
  onKakaoShare?: () => void;
  /** 클립보드에 복사하기 클릭 핸들러 */
  onCopyLink: () => void;
  /** QR 이미지 저장하기 클릭 핸들러 */
  onSaveQr?: () => void;
}

const ShareModal = ({
  isOpen,
  onClose,
  onKakaoShare = () => {},
  onCopyLink,
  onSaveQr = () => {},
}: ShareModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <S.Wrapper>
        <Modal.Content>
          <S.Container>
            <S.GraphicHeader aria-hidden="true">
              <S.HeaderLine />
              <S.HeaderGraphic />
            </S.GraphicHeader>

            <S.TextGroup>
              <S.Title>초대장 보내기</S.Title>
              <S.Subtitle>
                방명록을 남길 수 있도록
                <br />
                스페이스를 공유해보세요
              </S.Subtitle>
            </S.TextGroup>

            <S.ActionList>
              <S.ActionButton type="button" onClick={onKakaoShare}>
                <S.KakaoBadge aria-hidden="true" />
                <span>카카오톡으로 보내기</span>
              </S.ActionButton>
              <S.ActionButton type="button" onClick={onCopyLink}>
                <S.ActionIcon aria-hidden="true">
                  <IcLink width={20} height={20} />
                </S.ActionIcon>
                <span>클립보드에 복사하기</span>
              </S.ActionButton>
              <S.ActionButton type="button" onClick={onSaveQr}>
                <S.ActionIcon aria-hidden="true">
                  <IcQr width={20} height={20} />
                </S.ActionIcon>
                <span>QR 이미지 저장하기</span>
              </S.ActionButton>
            </S.ActionList>
          </S.Container>
        </Modal.Content>

        <S.CloseButton>
          <Button
            variant="icon"
            icon={<IcClose width={24} height={24} />}
            aria-label="닫기"
            onClick={onClose}
          />
        </S.CloseButton>
      </S.Wrapper>
    </Modal>
  );
};

export default ShareModal;
