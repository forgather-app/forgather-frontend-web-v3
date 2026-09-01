import styled from "@emotion/styled";
import IcKakaoBadge from "@/assets/icons/ic_kakao_badge.svg?react";
import InviteGraphic from "@/assets/images/invite_graphic.svg?react";
import InviteGraphicLine from "@/assets/images/invite_graphic_line.svg?react";
import Button from "@/components/@common/Button/Button";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 40px;
`;

export const CloseButton = styled(Button)`
  position: relative;
  z-index: ${({ theme }) => theme.layout.zIndex.modalContent};
  width: 64px;
  height: 64px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  color: ${({ theme }) => theme.colors.gray.gray200};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 32px 0 16px;
`;

export const GraphicHeader = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 88px;
  overflow: hidden;
`;

export const HeaderLine = styled(InviteGraphicLine)`
  position: absolute;
  top: 9px;
  left: 0;
  width: 100%;
  height: 35px;
`;

export const HeaderGraphic = styled(InviteGraphic)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

export const Title = styled.h2`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
`;

export const Subtitle = styled.p`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 0 16px;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
`;

export const ActionIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.gray.gray200};
`;

export const CopyActionIcon = styled(ActionIcon)`
  color: ${({ theme }) => theme.colors.icon.default};

  & path {
    fill: currentColor;
  }
`;

export const KakaoBadge = styled(IcKakaoBadge)`
  flex-shrink: 0;
`;
