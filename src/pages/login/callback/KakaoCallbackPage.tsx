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
