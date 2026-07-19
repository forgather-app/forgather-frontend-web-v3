import styled from "@emotion/styled";

// NOTE: react-markdown 등이 렌더링하는 h1~h3/p/li/ul/ol/strong 태그에만 적용되는 스타일입니다.
// 마크다운 렌더러를 거치지 않은 자식 엘리먼트에는 영향을 주지 않습니다.
export const MarkdownContent = styled.div`
  > * + * {
    margin-top: 12px;
  }

  h1,
  h2 {
    ${({ theme }) => ({ ...theme.typography.body2 })};
    color: ${({ theme }) => theme.colors.gray.white};
  }

  h3 {
    ${({ theme }) => ({ ...theme.typography.label })};
    color: ${({ theme }) => theme.colors.gray.white};
  }

  p,
  li {
    ${({ theme }) => ({ ...theme.typography.caption })};
    color: ${({ theme }) => theme.colors.gray.gray100};
  }

  ul {
    list-style: disc;
    padding-left: 20px;
  }

  ol {
    list-style: decimal;
    padding-left: 20px;
  }

  li + li {
    margin-top: 4px;
  }

  strong {
    font-weight: 700;
    color: ${({ theme }) => theme.colors.gray.white};
  }
`;
