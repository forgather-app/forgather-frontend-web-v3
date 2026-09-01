import styled from "@emotion/styled";
import { CROP_WINDOW_SIZE } from "@/pages/profileEdit/constants/imageCropper.constants";

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  background-color: ${({ theme }) => theme.colors.gray.gray700};
  z-index: ${({ theme }) => theme.layout.zIndex.modal};
  overflow: hidden;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const GestureArea = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  touch-action: none;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

export const CropImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: none;
  user-select: none;
  -webkit-user-drag: none;
`;

export const Overlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

/* NOTE: 크롭 창은 이동 제한 계산(clampTranslate)과 기준을 맞추기 위해
   이미지와 동일하게 컨테이너 정중앙에 배치한다 */
export const CropWindow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${CROP_WINDOW_SIZE}px;
  height: ${CROP_WINDOW_SIZE}px;
  border: 1px solid ${({ theme }) => theme.colors.main.purple};
  border-radius: 50%;
  /* TODO: 토큰 없음 - rgba(17, 17, 17, 0.4) (semantic.black 40% 딤) */
  box-shadow: 0 0 0 100vmax rgba(17, 17, 17, 0.4);
`;

export const Guide = styled.p`
  position: absolute;
  top: calc(50% + ${CROP_WINDOW_SIZE / 2}px + 24px);
  left: 0;
  right: 0;
  text-align: center;
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.white};
  /* TODO: 토큰 없음 - rgba(17, 17, 17, 0.4) (텍스트 가독성용 그림자) */
  text-shadow: 0 0 20px rgba(17, 17, 17, 0.4);
`;

export const Footer = styled.footer`
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 16px;
`;
