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
  z-index: 1;
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
  justify-content: center;
  overflow: hidden;
  padding: 64px 0 170px;
`;

export const ImageSquare = styled.div`
  /*
   * width를 SwiperAction이 ResizeObserver로 비동기 측정하는 슬라이드 폭(100%)에 맡기면,
   * 첫 렌더에서 폭이 0으로 측정될 수 있다. 뷰포트 기준 값으로 즉시(동기) 계산되도록 해서
   * 이 레이스 컨디션을 피한다.
   */
  width: min(100vw, ${({ theme }) => theme.layout.maxWidth});
  display: flex;
  /*
   * 캐러셀 트랙 높이는 가장 큰 이미지에 맞춰지므로, 그보다 작은 이미지도
   * 트랙 높이 안에서 세로 중앙에 오도록 정렬한다.
   */
  align-items: center;
  justify-content: center;
`;

/** 이미지(또는 플레이스홀더) 실제 렌더 크기에 맞춰 줄어드는 래퍼. 다운로드 버튼의 위치 기준이 된다 */
export const ImageFrame = styled.div`
  position: relative;
  flex-shrink: 0;
  width: fit-content;
  max-width: 100%;
`;

export const SlideImage = styled.img`
  display: block;
  width: auto;
  height: auto;
  /*
   * 원본 비율을 유지하면서, 닫기 버튼(상단)·그라데이션 푸터(하단)를 제외한
   * 뷰포트 안에 들어오도록 제한한다. 가로가 긴 이미지는 max-width가 먼저 걸려
   * 기기 폭(100%)에 맞고, 세로가 긴 이미지는 max-height가 걸려 폭이 줄어든다.
   */
  max-width: 100%;
  max-height: calc(100dvh - 234px);
  box-shadow: 0 0 60px 0 rgba(0, 0, 0, 0.6);
`;

export const PlaceholderWrapper = styled.div`
  width: min(100vw, ${({ theme }) => theme.layout.maxWidth});
  max-width: 100%;
  aspect-ratio: 1;
  max-height: calc(100dvh - 234px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  box-shadow: 0 0 60px 0 rgba(0, 0, 0, 0.6);

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
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 24px 12px calc(24px + env(safe-area-inset-bottom, 0px));
  background: linear-gradient(
    180deg,
    rgba(17, 17, 17, 0) 0%,
    rgba(17, 17, 17, 1) 41%
  );
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
  gap: 4px;
`;

export const Dot = styled.div<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.gray.gray50 : theme.colors.gray.gray500};
`;

export const SaveAllButton = styled.button`
  padding: 8px 16px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
  color: ${({ theme }) => theme.colors.gray.gray50};
  ${({ theme }) => ({ ...theme.typography.label })};
`;
