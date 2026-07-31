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
  // NOTE: react-query의 isPending은 BE confirmLogin 호출 구간만 커버함.
  // isRequesting은 RN에 KAKAO_LOGIN을 보낸 시점부터 KAKAO_TOKEN을 받기까지(네이티브 로그인 UI 상호작용 포함)
  // RN과의 브릿지 통신 전체 구간을 막기 위한 상태라 별도로 필요함
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
      // NOTE: 웹뷰가 아닌 일반 브라우저에서는 네이티브 로그인이 불가능함.
      // dev 우회 로그인은 DevLoginModal(mock user)에서 별도 제공하므로 여기서 중복 구현하지 않음
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
