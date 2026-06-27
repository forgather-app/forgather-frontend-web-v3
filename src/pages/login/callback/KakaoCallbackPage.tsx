import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useKakaoLoginConfirm } from "@/api/generated/auth-인증";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "@/hooks/@common/useSnackBar";

const KakaoCallbackPage = () => {
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();
  const { mutate: confirmLogin } = useKakaoLoginConfirm();
  const { code } = useSearch({ from: "/login/callback" });
  // NOTE: Strict Mode에서 useEffect가 두 번 실행되는 것을 방지.
  // 카카오 인가코드는 일회성이라 두 번째 요청이 실패하면 로그인 실패로 처리됨.
  const hasRequested = useRef(false);

  useEffect(() => {
    if (!code) {
      showSnackBar(ERROR_MESSAGES.LOGIN_FAILED, "error");
      navigate({ to: "/login" });
      return;
    }

    if (hasRequested.current) return;
    hasRequested.current = true;

    confirmLogin(
      { data: { access_token: code } },
      {
        onSuccess: () => {
          showSnackBar("로그인 완료", "alert");
          navigate({ to: "/" });
        },
        onError: () => {
          showSnackBar(ERROR_MESSAGES.LOGIN_FAILED, "error");
          navigate({ to: "/login" });
        },
      },
    );
  }, [code, confirmLogin, navigate, showSnackBar]);

  return null;
};

export default KakaoCallbackPage;
