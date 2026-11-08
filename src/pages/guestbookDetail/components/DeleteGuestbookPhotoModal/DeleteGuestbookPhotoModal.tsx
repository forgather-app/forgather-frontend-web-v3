import { useQueryClient } from "@tanstack/react-query";
import {
  getReadCardQueryKey,
  useDeleteCardPhotos,
} from "@/api/generated/spaceguestbook-스페이스-방명록";
import Button from "@/components/@common/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "@/hooks/@common/useSnackBar";
import * as S from "./DeleteGuestbookPhotoModal.styles";

export interface DeleteGuestbookPhotoModalProps {
  /** 모달 열림 여부 */
  isOpen: boolean;
  /** 모달을 닫을 때 호출되는 콜백 */
  onClose: () => void;
  /** 스페이스 ID */
  spaceId: string;
  /** 삭제할 사진이 속한 방명록 카드 ID. 선택된 사진이 없으면 undefined */
  cardId?: number;
  /** 삭제할 사진 ID. 선택된 사진이 없으면 undefined */
  photoId?: number;
  /** 삭제 성공 후 호출되는 콜백 */
  onDeleted: () => void;
}

const DeleteGuestbookPhotoModal = ({
  isOpen,
  onClose,
  spaceId,
  cardId,
  photoId,
  onDeleted,
}: DeleteGuestbookPhotoModalProps) => {
  const queryClient = useQueryClient();
  const { showSnackBar } = useSnackBar();
  const { mutate: deleteCardPhotos, isPending } = useDeleteCardPhotos();

  const handleConfirm = () => {
    if (cardId === undefined || photoId === undefined) return;
    deleteCardPhotos(
      {
        spaceCode: spaceId,
        guestBookCardId: cardId,
        data: { deletePhotoIds: [photoId] },
      },
      {
        onSuccess: () => {
          onClose();
          showSnackBar("사진을 삭제했어요", "alert");
          // containsPhoto 플래그가 바뀔 수 있어 목록 캐시도 함께 무효화한다
          queryClient.invalidateQueries({
            queryKey: ["guestbook", spaceId, "list"],
          });
          queryClient.invalidateQueries({
            queryKey: getReadCardQueryKey(spaceId, cardId),
          });
          onDeleted();
        },
        onError: () => {
          onClose();
          showSnackBar(ERROR_MESSAGES.GUEST_BOOK_PHOTO_DELETE_FAILED, "error");
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={!isPending}>
      <Modal.Overlay disableClose={isPending} />
      <Modal.Content>
        <S.ConfirmBody>
          <S.ConfirmTextGroup>
            <S.ConfirmTitle>사진을 삭제할까요?</S.ConfirmTitle>
            <S.ConfirmSubtitle>삭제하면 되돌릴 수 없어요</S.ConfirmSubtitle>
          </S.ConfirmTextGroup>
          <S.ConfirmActions>
            <Button
              variant="tertiary"
              text="취소"
              onClick={onClose}
              disabled={isPending}
              style={{ flex: 1 }}
            />
            <Button
              variant="danger"
              text="삭제하기"
              onClick={handleConfirm}
              disabled={isPending}
              style={{ flex: 1 }}
            />
          </S.ConfirmActions>
        </S.ConfirmBody>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteGuestbookPhotoModal;
