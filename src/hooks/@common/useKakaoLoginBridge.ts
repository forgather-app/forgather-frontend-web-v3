import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useKakaoLoginConfirm } from "@/api/generated/auth-인증";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "./useSnackBar";

// NOTE: RN → Web 메시지 형식
// 성공: { type: 'KAKAO_TOKEN', payload: { access_token: string; id_token?: string } }
// 취소/실패: { type: 'KAKAO_LOGIN_ERROR' }
interface KakaoTokenMessage {
  type: "KAKAO_TOKEN";
  payload: {
    access_token: string;
    id_token?: string;
  };
}

interface KakaoLoginErrorMessage {
  type: "KAKAO_LOGIN_ERROR";
}

type KakaoBridgeMessage = KakaoTokenMessage | KakaoLoginErrorMessage;

const useKakaoLoginBridge = (redirectTo?: string) => {
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
          // NOTE: 인증 토큰은 서버가 응답 시 쿠키로 내려주므로 별도 저장 불필요
          onSuccess: () => {
            showSnackBar("로그인 완료", "alert");
            navigate({ href: redirectTo ?? "/" });
          },
          onError: () => {
            showSnackBar(ERROR_MESSAGES.LOGIN_FAILED, "error");
            setIsRequesting(false);
          },
        },
      );
    },
    [confirmLogin, navigate, showSnackBar, redirectTo],
  );

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        const rawData =
          typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (!rawData) return;
        const data = rawData as KakaoBridgeMessage;

        if (data.type === "KAKAO_TOKEN") {
          handleKakaoToken(data.payload);
          return;
        }
        if (data.type === "KAKAO_LOGIN_ERROR") {
          setIsRequesting(false);
        }
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
