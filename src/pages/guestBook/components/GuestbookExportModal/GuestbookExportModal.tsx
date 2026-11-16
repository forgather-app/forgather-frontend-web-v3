import { useState } from "react";
// 백엔드 스펙의 operationId가 "request"로 너무 일반적이라 이름 없이 생성되어 use 시점에 별칭을 준다
import { useRequest as useExportSpacePdf } from "@/api/generated/space-스페이스";
import Button from "@/components/@common/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "@/hooks/@common/useSnackBar";
import { isValidEmail } from "@/utils/isValidEmail";
import * as S from "./GuestbookExportModal.styles";

export interface GuestbookExportModalProps {
  /** 모달 열림 여부 */
  isOpen: boolean;
  /** 모달을 닫을 때 호출되는 콜백 */
  onClose: () => void;
  /** 스페이스 ID */
  spaceId: string;
}

const GuestbookExportModal = ({
  isOpen,
  onClose,
  spaceId,
}: GuestbookExportModalProps) => {
  const { showSnackBar } = useSnackBar();
  const [email, setEmail] = useState("");
  const { mutate: exportSpacePdf, isPending } = useExportSpacePdf();

  const handleClose = () => {
    setEmail("");
    onClose();
  };

  const trimmedEmail = email.trim();
  const hasError = trimmedEmail.length > 0 && !isValidEmail(trimmedEmail);
  const isSendDisabled = trimmedEmail.length === 0 || hasError || isPending;

  const handleSubmit = () => {
    if (isSendDisabled) return;

    exportSpacePdf(
      { spaceCode: spaceId, data: { email: trimmedEmail } },
      {
        onSuccess: () => {
          handleClose();
          showSnackBar("방명록이 전송되었습니다.", "alert");
        },
        onError: () => {
          showSnackBar(ERROR_MESSAGES.GUEST_BOOK_EXPORT_FAILED, "error");
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} closeOnEsc={!isPending}>
      <Modal.Overlay disableClose={isPending} />
      <Modal.Content>
        <S.ModalBody>
          <S.ContentGroup>
            <S.HeaderGroup>
              <S.Title>방명록 내보내기</S.Title>
              <S.Description>
                {
                  "현재까지 쌓인 방명록을 하나의 pdf로 내보내요.\n3분 내외의 시간이 소요될 수 있어요."
                }
              </S.Description>
            </S.HeaderGroup>
            <S.FieldGroup>
              <S.FieldBox $hasError={hasError}>
                <S.EmailInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일을 입력해주세요"
                  disabled={isPending}
                  aria-invalid={hasError || undefined}
                  aria-label="전송받을 이메일"
                />
                {hasError && (
                  <S.FieldError role="alert">잘못된 이메일입니다.</S.FieldError>
                )}
              </S.FieldBox>
            </S.FieldGroup>
          </S.ContentGroup>
          <S.ButtonGroup>
            <Button
              variant="tertiary"
              text="전송하기"
              onClick={handleSubmit}
              disabled={isSendDisabled}
            />
          </S.ButtonGroup>
        </S.ModalBody>
      </Modal.Content>
    </Modal>
  );
};

export default GuestbookExportModal;
