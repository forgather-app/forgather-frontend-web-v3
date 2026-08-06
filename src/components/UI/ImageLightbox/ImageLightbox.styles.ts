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
   * SwiperAction의 높이 고정 로직(useLayoutEffect의 scrollHeight 측정)이 그보다 먼저(동기적으로)
   * 실행돼 aspect-ratio 기반 높이가 0으로 잠깐 측정되고, 이후 리렌더되지 않아 0에 고정될 수 있다.
   * 뷰포트 기준 값으로 즉시(동기) 계산되도록 해서 이 레이스 컨디션을 피한다.
   */
  position: relative;
  width: min(100vw, ${({ theme }) => theme.layout.maxWidth});
  aspect-ratio: 1;
  overflow: hidden;
`;

export const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PlaceholderWrapper = styled.div`
  width: 100%;
  height: 100%;
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
