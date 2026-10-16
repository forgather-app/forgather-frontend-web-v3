import { useState } from "react";
import IcCheckmark from "@/assets/icons/ic_checkmark.svg?react";
import IcClose from "@/assets/icons/ic_close.svg?react";
import Button from "@/components/@common/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import {
  LANDING_APP_STORE_URL,
  LANDING_KAKAO_CHANNEL_URL,
} from "@/pages/landing/LandingPage.constants";
import { dismissToday } from "@/utils/dailyDismiss";
import * as S from "./LandingAppNoticeModal.styles";

interface LandingAppNoticeModalProps {
  /** 모달 열림 여부 */
  isOpen: boolean;
  /** 모달을 닫을 때 호출되는 콜백 */
  onClose: () => void;
  /** localStorage에 오늘 하루 숨김 상태를 저장할 때 사용하는 키 */
  dismissStorageKey: string;
}

const LandingAppNoticeModal = ({
  isOpen,
  onClose,
  dismissStorageKey,
}: LandingAppNoticeModalProps) => {
  const [dontShowToday, setDontShowToday] = useState(false);

  const handleClose = () => {
    if (dontShowToday) {
      dismissToday(dismissStorageKey);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Overlay />
      <Modal.Content>
        <S.ModalInner>
          <S.CloseButton type="button" onClick={handleClose} aria-label="닫기">
            <IcClose width={24} height={24} />
          </S.CloseButton>
          <S.Title>포게더가 앱으로 새로워졌어요</S.Title>
          <S.Description>
            <p>앱 출시 및 서비스 리뉴얼에 따라 이용 방식이 변경되었습니다.</p>
            <S.BulletList>
              <li>
                작가님: 포게더 앱에서 이용해 주세요. (기존/신규 작가님 모두)
              </li>
              <li>방문객: 기존처럼 웹에서 이용하실 수 있어요.</li>
            </S.BulletList>
            <p>
              현재 앱은 App Store(iOS)에서 만나보실 수 있으며, 안드로이드 버전은
              10월 중 출시 예정입니다.
            </p>
            <p>이용에 불편을 드려 죄송합니다.</p>
            <p>
              문의 및 건의 사항은 아래 '문의하기' 버튼을 눌러 카카오톡 채널로
              남겨 주세요. 감사합니다.
            </p>
          </S.Description>
          <S.ButtonRow>
            <Button
              variant="primary"
              text="App Store에서 다운로드"
              onClick={() => {
                window.open(
                  LANDING_APP_STORE_URL,
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
            />
            <Button
              variant="tertiary"
              text="문의하기"
              onClick={() => {
                window.open(
                  LANDING_KAKAO_CHANNEL_URL,
                  "_blank",
                  "noopener,noreferrer",
                );
              }}
            />
          </S.ButtonRow>
          <S.CheckboxRow>
            <S.CheckboxWrapper>
              <S.HiddenInput
                type="checkbox"
                id="landing-app-notice-dont-show-today"
                checked={dontShowToday}
                onChange={(e) => setDontShowToday(e.target.checked)}
              />
              <S.CheckIcon $checked={dontShowToday} aria-hidden="true">
                <IcCheckmark width={11} height={8} />
              </S.CheckIcon>
            </S.CheckboxWrapper>
            <S.CheckboxLabel htmlFor="landing-app-notice-dont-show-today">
              오늘 하루 보지 않기
            </S.CheckboxLabel>
          </S.CheckboxRow>
        </S.ModalInner>
      </Modal.Content>
    </Modal>
  );
};

export default LandingAppNoticeModal;
