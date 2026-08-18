import { useCallback, useEffect, useRef } from "react";
import { ERROR_MESSAGES } from "@/constants/error";
import { base64ToBlob } from "@/utils/base64ToBlob";
import useSnackBar from "./useSnackBar";

export interface PickedPhoto {
  blob: Blob;
  fileName: string;
}

// NOTE: RN → Web 메시지 형식
// 성공: { type: 'PHOTO_PICKER_RESULT', payload: { images: { base64, fileName, mimeType }[] } }
// 취소: { type: 'PHOTO_PICKER_CANCELLED' }
// 권한 거부: { type: 'PHOTO_PICKER_PERMISSION_DENIED' }
// 실패: { type: 'PHOTO_PICKER_ERROR' }
interface PhotoPickerResultMessage {
  type: "PHOTO_PICKER_RESULT";
  payload: {
    images: { base64: string; fileName: string; mimeType: string }[];
  };
}

interface PhotoPickerCancelledMessage {
  type: "PHOTO_PICKER_CANCELLED";
}

interface PhotoPickerPermissionDeniedMessage {
  type: "PHOTO_PICKER_PERMISSION_DENIED";
}

interface PhotoPickerErrorMessage {
  type: "PHOTO_PICKER_ERROR";
}

type PhotoPickerBridgeMessage =
  | PhotoPickerResultMessage
  | PhotoPickerCancelledMessage
  | PhotoPickerPermissionDeniedMessage
  | PhotoPickerErrorMessage;

const useNativePhotoPickerBridge = () => {
  const { showSnackBar } = useSnackBar();
  const pendingResolveRef = useRef<((photos: PickedPhoto[]) => void) | null>(
    null,
  );

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      try {
        const rawData =
          typeof e.data === "string" ? JSON.parse(e.data) : e.data;
        if (!rawData) return;
        const data = rawData as PhotoPickerBridgeMessage;
        const resolve = pendingResolveRef.current;
        if (!resolve) return;

        if (data.type === "PHOTO_PICKER_RESULT") {
          pendingResolveRef.current = null;
          resolve(
            data.payload.images.map(({ base64, fileName, mimeType }) => ({
              blob: base64ToBlob(base64, mimeType),
              fileName,
            })),
          );
          return;
        }
        if (data.type === "PHOTO_PICKER_CANCELLED") {
          pendingResolveRef.current = null;
          resolve([]);
          return;
        }
        if (data.type === "PHOTO_PICKER_PERMISSION_DENIED") {
          pendingResolveRef.current = null;
          showSnackBar(ERROR_MESSAGES.PHOTO_PERMISSION_DENIED, "error");
          resolve([]);
          return;
        }
        if (data.type === "PHOTO_PICKER_ERROR") {
          pendingResolveRef.current = null;
          showSnackBar(ERROR_MESSAGES.PHOTO_PICKER_FAILED, "error");
          resolve([]);
        }
      } catch (err) {
        // TODO: 원인 파악 후 제거
        console.error("PHOTO_PICKER parse/handle error", err, e.data);
      }
    };

    window.addEventListener("message", handleMessage);
    document.addEventListener("message", handleMessage as EventListener);
    return () => {
      window.removeEventListener("message", handleMessage);
      document.removeEventListener("message", handleMessage as EventListener);
    };
  }, [showSnackBar]);

  const isNativeAvailable =
    typeof window !== "undefined" && !!window.ReactNativeWebView;

  const requestPhotoPicker = useCallback(
    (maxCount: number): Promise<PickedPhoto[]> => {
      if (!window.ReactNativeWebView) {
        showSnackBar(ERROR_MESSAGES.APP_ONLY_FEATURE, "error");
        return Promise.resolve([]);
      }
      if (pendingResolveRef.current) return Promise.resolve([]);

      return new Promise((resolve) => {
        pendingResolveRef.current = resolve;
        window.ReactNativeWebView?.postMessage(
          JSON.stringify({
            type: "REQUEST_PHOTO_PICKER",
            payload: { maxCount },
          }),
        );
      });
    },
    [showSnackBar],
  );

  return { requestPhotoPicker, isNativeAvailable };
};

export default useNativePhotoPickerBridge;
