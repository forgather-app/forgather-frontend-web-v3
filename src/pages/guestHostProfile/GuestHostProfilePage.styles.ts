import styled from "@emotion/styled";
import { selectableText } from "@/styles/mixins";

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ScrollArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ProfileSection = styled.section`
  padding: 16px ${({ theme }) => theme.layout.sidePadding}px 24px;
`;

export const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const Name = styled.strong`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
  ${selectableText};
`;

export const NameSuffix = styled.span`
  ${({ theme }) => ({ ...theme.typography.heading3 })};
  color: ${({ theme }) => theme.colors.gray.gray50};
`;

export const IntroBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-top: 16px;
`;

export const IntroText = styled.p`
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  white-space: pre-line;
  ${selectableText};
`;

export const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray300};
  text-decoration: underline;
`;

export const SpaceListSection = styled.section`
  padding: 0 ${({ theme }) => theme.layout.sidePadding}px 24px;
`;

export const SectionTitle = styled.h2`
  ${({ theme }) => ({ ...theme.typography.body2 })};
  /* TODO: 토큰 없음 - Heading 16/SB(line-height 140%). body2는 line-height 160%로 근사 대체 */
  line-height: 1.4em;
  color: ${({ theme }) => theme.colors.gray.gray50};
  padding: 16px 0;
`;

export const SpaceList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
