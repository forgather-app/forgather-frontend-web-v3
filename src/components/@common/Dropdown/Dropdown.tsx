import { useEffect, useRef } from "react";
import * as S from "./Dropdown.styles";

export interface DropdownItem {
  /** 항목 텍스트 */
  label: string;
  /** 클릭 핸들러. 호출 후 드롭다운은 자동으로 닫힙니다 */
  onClick: () => void;
}

interface DropdownProps {
  /** 드롭다운 열림 여부 */
  isOpen: boolean;
  /** 바깥 클릭 · Esc · 항목 선택 시 호출되는 닫기 콜백 */
  onClose: () => void;
  /** 드롭다운에 표시할 항목 목록 */
  items: DropdownItem[];
}

const Dropdown = ({ isOpen, onClose, items }: DropdownProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) onClose();
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <S.Panel ref={panelRef} role="menu">
      {items.map((item) => (
        <S.Item
          key={item.label}
          type="button"
          role="menuitem"
          onClick={() => {
            item.onClick();
            onClose();
          }}
        >
          {item.label}
        </S.Item>
      ))}
    </S.Panel>
  );
};

export default Dropdown;
