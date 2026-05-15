import styled from "@emotion/styled";

export const containerLayout = `
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 16px;
  width: 328px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
`;

export const Thumbnail = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

export const ChipsRow = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const SpaceBadge = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 4px 8px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.gray.gray700};
`;

export const SpaceIconWrapper = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.gray.gray200};
`;

export const SpaceCount = styled.span`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  white-space: nowrap;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Title = styled.h3`
  margin: 0;
  ${({ theme }) => ({ ...theme.typography.body1 })};
  color: ${({ theme }) => theme.colors.gray.white};
  max-height: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Period = styled.span`
  ${({ theme }) => ({ ...theme.typography.caption })};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;
