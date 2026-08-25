import { useCallback, useEffect } from "react";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "./useSnackBar";

// NOTE: Web → RN 메시지 형식
// { type: 'KAKAO_SHARE', payload: KakaoShareTemplate }
// RN → Web 메시지 형식
// 실패: { type: 'KAKAO_SHARE_ERROR' }
interface KakaoShareTemplate {
  /** 공유 카드 제목 */
  title: string;
  /** 공유 카드 설명 */
  description?: string;
  /** 공유 카드 썸네일 이미지 URL */
  imageUrl?: string;
  /** 카드 클릭 시 이동할 링크 */
  link: string;
  /** 공유 카드 버튼 텍스트 */
  buttonTitle?: string;
}

interface KakaoShareErrorMessage {
  type: "KAKAO_SHARE_ERROR";
}

type KakaoShareBridgeMessage = KakaoShareErrorMessage;

const useKakaoShareBridge = () => {
  const { showSnackBar } = useSnackBar();

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        const rawData =
          typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (!rawData) return;
        const data = rawData as KakaoShareBridgeMessage;

        if (data.type === "KAKAO_SHARE_ERROR") {
          showSnackBar(ERROR_MESSAGES.KAKAO_SHARE_FAILED, "error");
        }
      } catch (err) {
        // TODO: 원인 파악 후 제거
        console.error("KAKAO_SHARE parse/handle error", err, e.data);
      }
    };

    window.addEventListener("message", handleMessage);
    document.addEventListener("message", handleMessage as EventListener);
    return () => {
      window.removeEventListener("message", handleMessage);
      document.removeEventListener("message", handleMessage as EventListener);
    };
  }, [showSnackBar]);

  const requestKakaoShare = useCallback(
    (template: KakaoShareTemplate) => {
      if (!window.ReactNativeWebView) {
        showSnackBar(ERROR_MESSAGES.APP_ONLY_FEATURE, "error");
        return;
      }
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: "KAKAO_SHARE", payload: template }),
      );
    },
    [showSnackBar],
  );

  return { requestKakaoShare };
};

export default useKakaoShareBridge;
