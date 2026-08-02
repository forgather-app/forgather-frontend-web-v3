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

type SaveImageBridgeMessage = SaveImageSuccessMessage | SaveImageErrorMessage;

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
          showSnackBar("이미지를 저장했어요", "alert");
          return;
        }
        if (data.type === "SAVE_IMAGE_ERROR") {
          showSnackBar(ERROR_MESSAGES.DOWNLOAD_FAILED, "error");
        }
      } catch (err) {
        // TODO: 원인 파악 후 제거
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
