import { useCallback, useEffect } from "react";
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

const useSaveImageBridge = () => {
  const { showSnackBar } = useSnackBar();

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        const rawData =
          typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (!rawData) return;
        const data = rawData as SaveImageBridgeMessage;

        if (data.type === "SAVE_IMAGE_SUCCESS") {
          showSnackBar("이미지가 갤러리에 저장되었습니다.", "default");
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
