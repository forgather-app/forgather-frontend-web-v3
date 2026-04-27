import { useState } from "react";

interface UseDisclosureProps {
  isOpen: boolean;
  onClose: () => void;
}

const useDisclosure = ({ isOpen, onClose }: UseDisclosureProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  const toggleIsVisible = () => {
    setIsVisible(false);
  };

  const alertAnimationEnd = () => {
    console.log(isVisible);
    // NOTE: 바텀시트가 꺼질 떄만 동작
    if (!isVisible) {
      onClose();
    }
  };

  return { isVisible, toggleIsVisible, alertAnimationEnd };
};

export default useDisclosure;
