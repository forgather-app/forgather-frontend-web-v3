interface EnterKeyEvent {
  key: string;
  target: EventTarget | null;
  preventDefault: () => void;
}

/**
 * 폼 안의 input에서 Enter를 눌렀을 때 발생하는 암묵적 제출(implicit submission)을 막습니다.
 * textarea의 줄바꿈이나 button의 키보드 활성화(Enter로 클릭)는 그대로 유지합니다.
 */
export const preventEnterSubmit = (event: EnterKeyEvent) => {
  if (event.key !== "Enter") return;
  if (!(event.target instanceof HTMLInputElement)) return;
  event.preventDefault();
};
