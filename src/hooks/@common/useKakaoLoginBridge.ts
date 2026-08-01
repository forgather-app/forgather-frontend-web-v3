import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { setAccessToken } from "@/api/authToken";
import { useKakaoLoginConfirm } from "@/api/generated/auth-인증";
import type { ApiResponseLoginResponse } from "@/api/model";
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
          // 실제 응답 바디는 ApiResponseLoginResponse (JSON)이므로 캐스팅해서 사용.
          // refreshToken은 서버가 httpOnly 쿠키로 내려주므로 accessToken만 메모리에 보관
          onSuccess: (response) => {
            const { accessToken } =
              (response as unknown as ApiResponseLoginResponse).data ?? {};
            setAccessToken(accessToken);
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
      // NOTE: 웹뷰가 아닌 일반 브라우저에서는 네이티브 카카오 로그인이 불가능함.
      // 인증 토큰이 서버 쿠키로 발급되므로 클라이언트에서 임의 주입이 불가능해짐 —
      // 개발 환경 테스트는 BE를 직접 호출하는 DevLoginModal("[DEV] 아이디/비밀번호로 로그인")을 이용
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
