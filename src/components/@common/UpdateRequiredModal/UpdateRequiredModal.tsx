import { useSyncExternalStore } from "react";
import Button from "@/components/@common/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/constants/appLinks";
import { getAppClientType } from "@/utils/getClientHeaders";
import { updateRequiredStore } from "@/utils/updateRequiredStore";
import * as S from "./UpdateRequiredModal.styles";

// NOTE: 강제 업데이트 모달이라 ESC/배경 클릭으로 닫을 수 없다 — onClose는 Modal API가
// 요구해서 넘기는 no-op일 뿐, 실제로 호출될 경로가 없다.
const noop = () => {};

/**
 * 서버가 426(UPGRADE_REQUIRED)을 응답하면 뜨는 강제 업데이트 안내 모달.
 */
const UpdateRequiredModal = () => {
  const isOpen = useSyncExternalStore(
    updateRequiredStore.subscribe,
    updateRequiredStore.getSnapshot,
  );

  const isAndroid = getAppClientType(navigator.userAgent) === "ANDROID";
  const storeUrl = isAndroid ? PLAY_STORE_URL : APP_STORE_URL;

  return (
    <Modal isOpen={isOpen} onClose={noop} closeOnEsc={false}>
      <Modal.Overlay disableClose />
      <Modal.Content>
        <S.Body>
          <S.TextGroup>
            <S.Title>앱 업데이트가 필요해요</S.Title>
            <S.Subtitle>
              더 나은 서비스 제공을 위해 업데이트해 주세요.
            </S.Subtitle>
          </S.TextGroup>
          <Button
            variant="primary"
            text="업데이트하기"
            disabled={!storeUrl}
            onClick={() => {
              if (!storeUrl) return;
              window.open(storeUrl, "_blank", "noopener,noreferrer");
            }}
            style={{ width: "100%" }}
          />
        </S.Body>
      </Modal.Content>
    </Modal>
  );
};

export default UpdateRequiredModal;
