import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useKakaoLoginConfirm } from "@/api/generated/auth-인증";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "./useSnackBar";

// NOTE: RN → Web 메시지 형식
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
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        const rawData =
          typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (!rawData || rawData.type !== "KAKAO_TOKEN") return;
        const data = rawData as KakaoTokenMessage;

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
              setIsRequesting(false);
            },
          },
        );
      } catch (err) {
        // TODO: 원인 파악 후 제거
        console.error("KAKAO_TOKEN parse/handle error", err, e.data);
      }
    };

    window.addEventListener("message", handleMessage);
    document.addEventListener("message", handleMessage as EventListener);
    return () => {
      window.removeEventListener("message", handleMessage);
      document.removeEventListener("message", handleMessage as EventListener);
    };
  }, [confirmLogin, navigate, showSnackBar]);

  // Web → RN: 카카오 로그인 요청
  const requestKakaoLogin = () => {
    if (isRequesting) return;
    if (!window.ReactNativeWebView) {
      showSnackBar(ERROR_MESSAGES.APP_ONLY_FEATURE, "error");
      return;
    }
    setIsRequesting(true);
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: "KAKAO_LOGIN" }),
    );
  };

  return { requestKakaoLogin, isRequesting };
};

export default useKakaoLoginBridge;
