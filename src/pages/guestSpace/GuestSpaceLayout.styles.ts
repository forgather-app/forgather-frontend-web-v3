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
  /* 버튼 아래 34px까지 배경으로 덮어야 스크롤 중 콘텐츠가 버튼 아래 띠로 비쳐 보이지 않는다 */
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  padding: 24px ${({ theme }) => theme.layout.sidePadding}px 34px;
  background: linear-gradient(
    0deg,
    ${({ theme }) => theme.colors.gray.gray700} 57%,
    rgba(27, 29, 31, 0) 100%
  );
  z-index: ${({ theme }) => theme.layout.zIndex.bottomSheet};
`;
