import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
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

  const handleKakaoToken = useCallback(
    (payload: KakaoTokenMessage["payload"]) => {
      confirmLogin(
        {
          data: {
            access_token: payload.access_token,
            id_token: payload.id_token,
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
    },
    [confirmLogin, navigate, showSnackBar],
  );

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        const rawData =
          typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (!rawData || rawData.type !== "KAKAO_TOKEN") return;
        const data = rawData as KakaoTokenMessage;

        handleKakaoToken(data.payload);
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
  }, [handleKakaoToken]);

  // Web → RN: 카카오 로그인 요청
  const requestKakaoLogin = () => {
    if (isRequesting) return;

    if (!window.ReactNativeWebView) {
      // NOTE: 웹뷰가 아닌 일반 브라우저에서는 네이티브 로그인이 불가능하므로,
      // 개발 환경에서만 access_token을 직접 입력받아 로그인 흐름을 테스트할 수 있게 함
      if (import.meta.env.DEV) {
        const accessToken = window.prompt(
          "[DEV] 카카오 access_token을 입력하세요",
        );
        if (!accessToken) return;
        setIsRequesting(true);
        handleKakaoToken({ access_token: accessToken });
        return;
      }

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
