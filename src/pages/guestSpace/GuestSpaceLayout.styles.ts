import styled from "@emotion/styled";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

export const TabWrapper = styled.div`
  flex-shrink: 0;
  padding-top: 24px;
`;

export const ContentArea = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  margin-top: 24px;
`;

export const WriteCtaWrapper = styled.div`
  position: fixed;
  bottom: 34px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  padding: 24px ${({ theme }) => theme.layout.sidePadding}px 0;
  background: linear-gradient(
    0deg,
    ${({ theme }) => theme.colors.gray.gray700} 38%,
    rgba(27, 29, 31, 0) 100%
  );
  z-index: ${({ theme }) => theme.layout.zIndex.bottomSheet};
`;
