import styled from "@emotion/styled";

export const Root = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.layout.zIndex.modalContent};
  width: min(100%, ${({ theme }) => theme.layout.maxWidth});
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const SwiperWrapper = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
`;

export const ImageSquare = styled.div`
  /*
   * width를 SwiperAction이 ResizeObserver로 비동기 측정하는 슬라이드 폭(100%)에 맡기면,
   * 첫 렌더에서 폭이 0으로 측정될 수 있다. 뷰포트 기준 값으로 즉시(동기) 계산되도록 해서
   * 이 레이스 컨디션을 피한다. 높이는 강제하지 않고 이미지 원본 비율을 따르게 둔다.
   */
  position: relative;
  width: min(100vw, ${({ theme }) => theme.layout.maxWidth});
`;

export const SlideImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

export const PlaceholderWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray.gray600};

  svg {
    width: 50%;
    height: 50%;
  }
`;

export const DownloadButtonWrapper = styled.div`
  position: absolute;
  right: 13px;
  bottom: 13px;
`;

export const FooterPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;
  padding: 24px 12px;
  flex-shrink: 0;
`;

export const CounterGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const CounterText = styled.span`
  ${({ theme }) => ({ ...theme.typography.heading3 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
`;

export const DotsWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

export const Dot = styled.div<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.gray.white : theme.colors.gray.gray500};
`;

export const SaveAllButton = styled.button`
  padding: 8px 16px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
  color: ${({ theme }) => theme.colors.gray.gray50};
  ${({ theme }) => ({ ...theme.typography.label })};
`;
