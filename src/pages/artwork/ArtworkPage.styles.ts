import styled from "@emotion/styled";

export const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  padding-top: 24px;
`;

export const Title = styled.h1`
  ${({ theme }) => ({ ...theme.typography.title1 })};
  color: ${({ theme }) => theme.colors.gray.white};
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const EditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 29px;
  height: 29px;
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const DescriptionRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
  margin-top: 16px;
`;

export const Description = styled.p`
  flex: 1;
  min-width: 0;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const MoreButton = styled.button`
  flex-shrink: 0;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray300};
`;

export const Divider = styled.div`
  height: 8px;
  margin: 24px calc(-1 * ${({ theme }) => theme.layout.sidePadding}px) 0;
  background-color: rgba(17, 17, 17, 0.7);
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
`;

export const SectionTitle = styled.h2`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.colors.gray.gray400};
`;

export const CarouselWrapper = styled.div`
  margin-top: 16px;
`;

export const BottomSpacer = styled.div`
  position: sticky;
  bottom: 0;
  flex-shrink: 0;
  height: 34px;
  background: linear-gradient(
    180deg,
    rgba(27, 29, 31, 0) 0%,
    ${({ theme }) => theme.colors.gray.gray700} 50%
  );
  pointer-events: none;
`;

export const BottomBar = styled.div`
  position: fixed;
  bottom: 34px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  padding: 0 24px;
  z-index: ${({ theme }) => theme.layout.zIndex.bottomSheet};
`;

export const FloatingIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  box-shadow: 0px 0px 20px 0px rgba(17, 17, 17, 0.75);
  color: ${({ theme }) => theme.colors.gray.gray200};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
  }
`;
