import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useKakaoLoginConfirm } from "@/api/generated/auth-인증";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "./useSnackBar";

// RN → Web 메시지 형식
// { type: 'KAKAO_TOKEN', payload: { access_token: string; id_token?: string } }
interface KakaoTokenMessage {
  type: "KAKAO_TOKEN";
  payload: {
    access_token: string;
    id_token?: string;
  };
}

const useKakaoLoginBridge = () => {
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();
  const { mutate: confirmLogin } = useKakaoLoginConfirm();

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        const data = JSON.parse(String(e.data)) as KakaoTokenMessage;
        if (data.type !== "KAKAO_TOKEN") return;

        confirmLogin(
          {
            data: {
              access_token: data.payload.access_token,
              id_token: data.payload.id_token,
            },
          },
          {
            onSuccess: () => {
              showSnackBar("로그인 완료", "alert");
              navigate({ to: "/" });
            },
            onError: () => {
              showSnackBar(ERROR_MESSAGES.LOGIN_FAILED, "error");
            },
          },
        );
      } catch {}
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [confirmLogin, navigate, showSnackBar]);

  // Web → RN: 카카오 로그인 요청
  const requestKakaoLogin = () => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: "KAKAO_LOGIN" }),
    );
  };

  return { requestKakaoLogin };
};

export default useKakaoLoginBridge;
