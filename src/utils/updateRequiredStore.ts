type Listener = () => void;

let isOpen = false;
const listeners = new Set<Listener>();

const emitChange = () => {
  for (const listener of listeners) listener();
};

/**
 * 서버가 426(UPGRADE_REQUIRED)을 응답했음을 React 트리에 알리는 외부 스토어.
 *
 * `apiClient.ts`의 axios 인터셉터는 React 트리 밖이라 Context/상태를 직접 못 쓴다.
 * `open()`은 거기서 호출하고, `UpdateRequiredModal`이 `useSyncExternalStore`로
 * 구독해서 모달을 띄운다.
 */
export const updateRequiredStore = {
  getSnapshot: () => isOpen,
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  open: () => {
    if (isOpen) return;
    isOpen = true;
    emitChange();
  },
};
