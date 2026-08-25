import { useEffect } from "react";

const DISABLED_ZOOM_VIEWPORT_CONTENT =
  "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";

/**
 * 마운트되어 있는 동안 뷰포트 메타 태그를 수정해 핀치/더블탭 확대를 막는다.
 * 언마운트 시 원래 뷰포트 설정으로 복원한다.
 */
export const useDisableZoom = () => {
  useEffect(() => {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) return;

    const previousContent = viewport.getAttribute("content");
    viewport.setAttribute("content", DISABLED_ZOOM_VIEWPORT_CONTENT);

    return () => {
      if (previousContent) viewport.setAttribute("content", previousContent);
    };
  }, []);
};
