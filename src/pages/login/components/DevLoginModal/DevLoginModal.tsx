import { useNavigate } from "@tanstack/react-router";
import { useId, useState } from "react";
import { setAccessToken } from "@/api/authToken";
import { useDevLogin } from "@/api/generated/auth-개발용-임시-로그인";
import type { ApiResponseLoginResponse } from "@/api/model";
import Button from "@/components/@common/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "@/hooks/@common/useSnackBar";
import * as S from "./DevLoginModal.styles";

interface DevLoginModalProps {
  /** 모달 열림 여부 */
  isOpen: boolean;
  /** 모달을 닫을 때 호출되는 콜백 */
  onClose: () => void;
}

const DevLoginModal = ({ isOpen, onClose }: DevLoginModalProps) => {
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();
  const { mutate: devLogin, isPending } = useDevLogin();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const loginIdInputId = useId();
  const passwordInputId = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    devLogin(
      { data: { loginId, password } },
      {
        // NOTE: BE 스펙상 응답 content-type이 `*/*`라 orval이 Blob으로 잘못 추론함.
        // 실제 응답 바디는 ApiResponseLoginResponse (JSON)이므로 캐스팅해서 사용.
        // refreshToken은 서버가 httpOnly 쿠키로 내려주므로 accessToken만 메모리에 보관
        onSuccess: (response) => {
          const { accessToken } =
            (response as unknown as ApiResponseLoginResponse).data ?? {};
          setAccessToken(accessToken);
          showSnackBar("로그인 완료", "alert");
          onClose();
          navigate({ to: "/" });
        },
        onError: () => {
          showSnackBar(ERROR_MESSAGES.LOGIN_FAILED, "error");
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Content>
        <form onSubmit={handleSubmit}>
          <S.Body>
            <S.Title>[DEV] 개발용 임시 로그인</S.Title>
            <S.FieldGroup>
              <S.Label htmlFor={loginIdInputId}>아이디</S.Label>
              <S.Input
                id={loginIdInputId}
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="아이디를 입력해주세요"
                autoComplete="username"
                autoFocus
              />
            </S.FieldGroup>
            <S.FieldGroup>
              <S.Label htmlFor={passwordInputId}>비밀번호</S.Label>
              <S.Input
                id={passwordInputId}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력해주세요"
                autoComplete="current-password"
              />
            </S.FieldGroup>
            <S.ActionRow>
              <Button
                type="button"
                variant="tertiary"
                text="취소"
                onClick={onClose}
                style={{ flex: 1 }}
              />
              <Button
                type="submit"
                variant="primary"
                text="로그인"
                disabled={!loginId || !password || isPending}
                style={{ flex: 1 }}
              />
            </S.ActionRow>
          </S.Body>
        </form>
      </Modal.Content>
    </Modal>
  );
};

export default DevLoginModal;
