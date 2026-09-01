import styled from "@emotion/styled";
import { selectableText } from "@/styles/mixins";

export const Card = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ImageArea = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 2px;
  height: 200px;
  padding: 16px 12px;
  border-radius: 8px;
  overflow: hidden;
  /* 캐러셀 Track의 transform 하위에서 overflow 클리핑이 깨져 모서리에 틈이 생기는 것 방지 */
  isolation: isolate;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
`;

export const Thumbnail = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: inherit;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
`;

export const Dim = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 144px;
  border-radius: inherit;
  background: linear-gradient(
    180deg,
    rgba(17, 17, 17, 0) 23%,
    rgba(17, 17, 17, 0.6) 54%,
    rgba(17, 17, 17, 0.8) 75%,
    rgba(17, 17, 17, 0.9) 100%
  );
`;

export const LabelRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const Label = styled.span`
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const SpaceName = styled.h2`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.white};
  position: relative;
  padding: 0 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  ${selectableText};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
`;

export const ActionButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px 10px;
  background-color: ${({ theme }) => theme.colors.gray.gray600};
  ${({ theme }) => ({ ...theme.typography.label })};
  color: ${({ theme }) => theme.colors.gray.white};
`;

export const Divider = styled.div`
  width: 1px;
  height: 18px;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
  flex-shrink: 0;
`;

export const Badge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding-bottom: 1px;
  border-radius: 50%;
  /* TODO: 토큰 없음 - #FF4242 (semantic.alertRed #FF4B4B로 대체) */
  background-color: ${({ theme }) => theme.colors.semantic.alertRed};
  color: ${({ theme }) => theme.colors.gray.white};
  /* TODO: 토큰 없음 - 10px/800 */
  font-size: 10px;
  font-weight: 800;
  line-height: 140%;
  letter-spacing: -0.02em;
`;
