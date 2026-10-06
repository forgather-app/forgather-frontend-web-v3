const getTodayKey = () => new Date().toDateString();

/** storageKey로 저장된 값이 오늘 날짜와 같으면 true를 반환한다 (localStorage 접근 불가 시 false) */
export const isDismissedToday = (storageKey: string): boolean => {
  try {
    return localStorage.getItem(storageKey) === getTodayKey();
  } catch {
    return false;
  }
};

/** storageKey에 오늘 날짜를 저장해 자정까지 다시 노출되지 않도록 한다 */
export const dismissToday = (storageKey: string): void => {
  try {
    localStorage.setItem(storageKey, getTodayKey());
  } catch {
    // 사파리 프라이빗 모드 등 localStorage 접근이 막힌 환경에서는 조용히 무시한다
  }
};
