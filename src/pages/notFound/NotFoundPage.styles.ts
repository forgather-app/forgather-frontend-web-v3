import styled from "@emotion/styled";

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
`;

export const IllustrationWrapper = styled.div`
  position: relative;
  width: 240px;
  height: 200px;
`;

export const Character = styled.div`
  position: absolute;
  left: 38.6px;
  top: 10.65px;
  width: 162.8px;
  height: 181.7px;
`;

export const BubbleTopRight = styled.div`
  position: absolute;
  left: 164.5px;
  top: 14px;
  width: 64px;
  height: 44px;
`;

export const BubbleLeft = styled.div`
  position: absolute;
  left: 4.5px;
  top: 61px;
  width: 64px;
  height: 44px;
`;

export const TextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-align: center;
`;

export const Title = styled.p`
  ${({ theme }) => ({ ...theme.typography.heading1 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const Description = styled.p`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const BackButton = styled.button`
  flex-shrink: 0;
  align-self: center;
  padding: 12px 16px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.gray.white};
  color: ${({ theme }) => theme.colors.semantic.black};
  /* TODO: 토큰 없음 - Bold(700) 14px 조합 (label 토큰은 SemiBold 600) */
  font-weight: 700;
  font-size: ${({ theme }) => theme.typography.label.fontSize};
  line-height: ${({ theme }) => theme.typography.label.lineHeight};
  letter-spacing: ${({ theme }) => theme.typography.label.letterSpacing};
`;
