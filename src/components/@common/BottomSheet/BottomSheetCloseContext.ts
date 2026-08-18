import { createContext, useContext } from "react";

export const BottomSheetCloseContext = createContext<(() => void) | null>(null);

/** 콘텐츠 내부(예: 헤더의 닫기 버튼)에서 드래그-닫기와 동일한 애니메이션으로 시트를 닫을 때 사용합니다. */
export const useBottomSheetClose = () => useContext(BottomSheetCloseContext);
