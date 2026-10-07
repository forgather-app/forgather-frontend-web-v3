import { useCallback, useEffect, useRef } from "react";
import { ERROR_MESSAGES } from "@/constants/error";
import useSnackBar from "./useSnackBar";

interface SaveImagePayload {
  url: string;
  filename?: string;
}

interface SaveImageSuccessMessage {
  type: "SAVE_IMAGE_SUCCESS";
}

interface SaveImageErrorMessage {
  type: "SAVE_IMAGE_ERROR";
}

interface SaveImagePermissionDeniedMessage {
  type: "SAVE_IMAGE_PERMISSION_DENIED";
}

type SaveImageBridgeMessage =
  | SaveImageSuccessMessage
  | SaveImageErrorMessage
  | SaveImagePermissionDeniedMessage;

interface UseSaveImageBridgeOptions {
  /** SAVE_IMAGE_SUCCESS 수신 시 호출되는 콜백 (예: 저장 완료 이벤트 트래킹) */
  onSuccess?: () => void;
}

const useSaveImageBridge = (options?: UseSaveImageBridgeOptions) => {
  const { showSnackBar } = useSnackBar();
  // 메시지 리스너를 재등록하지 않고도 최신 콜백을 참조하기 위해 ref로 보관한다
  const onSuccessRef = useRef(options?.onSuccess);
  onSuccessRef.current = options?.onSuccess;

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        const rawData =
          typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (!rawData) return;
        const data = rawData as SaveImageBridgeMessage;

        if (data.type === "SAVE_IMAGE_SUCCESS") {
          showSnackBar("이미지가 갤러리에 저장되었습니다.", "default");
          onSuccessRef.current?.();
          return;
        }
        if (data.type === "SAVE_IMAGE_PERMISSION_DENIED") {
          showSnackBar(ERROR_MESSAGES.PHOTO_PERMISSION_DENIED, "error");
          return;
        }
        if (data.type === "SAVE_IMAGE_ERROR") {
          showSnackBar(ERROR_MESSAGES.IMAGE_SAVE_FAILED, "error");
        }
      } catch (err) {
        console.error("SAVE_IMAGE parse/handle error", err, e.data);
      }
    };

    window.addEventListener("message", handleMessage);
    document.addEventListener("message", handleMessage as EventListener);
    return () => {
      window.removeEventListener("message", handleMessage);
      document.removeEventListener("message", handleMessage as EventListener);
    };
  }, [showSnackBar]);

  const saveImage = useCallback(
    (image: SaveImagePayload) => {
      if (!window.ReactNativeWebView) {
        showSnackBar(ERROR_MESSAGES.APP_ONLY_FEATURE, "error");
        return;
      }
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: "SAVE_IMAGE", payload: image }),
      );
    },
    [showSnackBar],
  );

  const saveImages = useCallback(
    (images: SaveImagePayload[]) => {
      if (!window.ReactNativeWebView) {
        showSnackBar(ERROR_MESSAGES.APP_ONLY_FEATURE, "error");
        return;
      }
      window.ReactNativeWebView.postMessage(
        JSON.stringify({ type: "SAVE_IMAGES", payload: { images } }),
      );
    },
    [showSnackBar],
  );

  return { saveImage, saveImages };
};

export default useSaveImageBridge;
