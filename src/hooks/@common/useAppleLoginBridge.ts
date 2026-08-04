import { useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useAppleLoginConfirm } from "@/api/generated/auth-인증";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "./useSnackBar";

// NOTE: RN → Web 메시지 형식
// { type: 'APPLE_TOKEN', payload: { id_token, authorization_code, raw_nonce, full_name? } }
// raw_nonce는 RN이 Apple 요청 전에 미리 생성해 보관한 값, full_name은 Apple 최초 동의 시에만 전달됨
interface AppleTokenMessage {
  type: "APPLE_TOKEN";
  payload: {
    id_token: string;
    authorization_code: string;
    raw_nonce: string;
    full_name?: string;
  };
}

const useAppleLoginBridge = () => {
  const navigate = useNavigate();
  const { showSnackBar } = useSnackBar();
  const { mutate: confirmLogin } = useAppleLoginConfirm();
  // NOTE: react-query의 isPending은 BE confirmLogin 호출 구간만 커버함.
  // isRequesting은 RN에 APPLE_LOGIN을 보낸 시점부터 APPLE_TOKEN을 받기까지(네이티브 로그인 UI 상호작용 포함)
  // RN과의 브릿지 통신 전체 구간을 막기 위한 상태라 별도로 필요함
  const [isRequesting, setIsRequesting] = useState(false);

  const handleAppleToken = useCallback(
    (payload: AppleTokenMessage["payload"]) => {
      confirmLogin(
        {
          data: {
            id_token: payload.id_token,
            authorization_code: payload.authorization_code,
            raw_nonce: payload.raw_nonce,
            full_name: payload.full_name,
          },
        },
        {
          // NOTE: 인증 토큰은 서버가 응답 시 쿠키로 내려주므로 별도 저장 불필요
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
        if (!rawData || rawData.type !== "APPLE_TOKEN") return;
        const data = rawData as AppleTokenMessage;

        handleAppleToken(data.payload);
      } catch (err) {
        // TODO: 원인 파악 후 제거
        console.error("APPLE_TOKEN parse/handle error", err, e.data);
      }
    };

    window.addEventListener("message", handleMessage);
    document.addEventListener("message", handleMessage as EventListener);
    return () => {
      window.removeEventListener("message", handleMessage);
      document.removeEventListener("message", handleMessage as EventListener);
    };
  }, [handleAppleToken]);

  // Web → RN: 애플 로그인 요청
  const requestAppleLogin = () => {
    if (isRequesting) return;

    if (!window.ReactNativeWebView) {
      // NOTE: 애플 로그인도 웹뷰 브릿지가 필요해 일반 브라우저에서 테스트 불가.
      showSnackBar(ERROR_MESSAGES.APP_ONLY_FEATURE, "error");
      return;
    }

    setIsRequesting(true);
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: "APPLE_LOGIN" }),
    );
  };

  return { requestAppleLogin, isRequesting };
};

export default useAppleLoginBridge;
