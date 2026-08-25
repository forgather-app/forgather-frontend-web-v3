import { css, type Theme } from "@emotion/react";

export const global = (theme: Theme) => css`
  :root {
    /* SwiperAction 이식을 위해 추가. theme.layout.sidePadding(16)과 동일하게 유지 */
    --layout-padding-x: 16px;
  }
  * {
    box-sizing: border-box;
    font-family: inherit;
    font-synthesis: none;
  }
  html,
  body,
  #root {
    height: 100%;
  }
  body {
    font-family: 'SUIT', 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
    background-color: ${theme.colors.gray.gray700};
    word-break: break-all;
  }
  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
  img {
    -webkit-user-drag: none;
    user-select: none;
    -webkit-touch-callout: none;
  }
  html {
    scroll-behavior: smooth;
  }
  input {
    &:focus {
      border: none;
      outline: none;
    }
  }
  button {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    box-shadow: none;
    border-radius: 0;
    &:disabled {
      cursor: default;
    }
  }
  textarea {
    resize: none;
    &:focus {
      border: none;
      outline: none;
    }
  }
  .scroll-lock {
    overflow: hidden;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    overscroll-behavior: none;
    touch-action: none;
  }
`;
