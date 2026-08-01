import styled from "@emotion/styled";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 328px;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
`;

export const TitleBox = styled.div`
  width: 100%;
  padding: 16px;
  border: 1px solid rgba(65, 72, 85, 0.8);
  border-radius: 16px 16px 0 0;
  background: ${({ theme }) => theme.colors.gradient.grayFill};
`;

export const Title = styled.p`
  ${({ theme }) => ({ ...theme.typography.body1 })};
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.gray.white};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

export const ImageFrame = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.semantic.black};
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PlaceholderWrapper = styled.div`
  position: absolute;
  left: 31px;
  top: 0;
  width: 365px;
  height: 365px;
`;
