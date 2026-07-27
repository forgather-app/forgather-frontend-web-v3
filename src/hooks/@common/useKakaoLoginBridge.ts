import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { setAuthTokens } from "@/api/authToken";
import { useKakaoLoginConfirm } from "@/api/generated/auth-인증";
import type { ApiResponseLoginResponse } from "@/api/model";
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
          // NOTE: BE 스펙상 응답 content-type이 `*/*`라 orval이 Blob으로 잘못 추론함.
          // 실제 응답 바디는 ApiResponseLoginResponse (JSON)이므로 캐스팅해서 사용
          onSuccess: (response) => {
            const { accessToken, refreshToken } =
              (response as unknown as ApiResponseLoginResponse).data ?? {};
            setAuthTokens(accessToken, refreshToken);
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
      // 개발 환경에서는 앱에서 실제 로그인 후 저장된 우리 서비스 accessToken을 직접 입력받아
      // BE 호출 없이 세션을 주입할 수 있게 함 (카카오 토큰이 아닌, 로그인이 끝난 뒤 발급된 토큰)
      if (import.meta.env.VITE_ENVIRONMENT === "development") {
        const accessToken = window.prompt(
          "[DEV] 앱에서 로그인 후 저장된 accessToken을 입력하세요",
        );
        if (!accessToken) return;
        const refreshToken = window.prompt(
          "[DEV] refreshToken도 입력하세요 (없으면 취소)",
        );
        setAuthTokens(accessToken, refreshToken ?? undefined);
        showSnackBar("로그인 완료", "alert");
        navigate({ to: "/" });
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
