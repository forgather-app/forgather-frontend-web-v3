/**
 * $ 접두사 props는 DOM에 전달하지 않는 shouldForwardProp 유틸
 *
 * Emotion styled()의 두 번째 인자로 사용합니다.
 * `$` prefix 를 가진 prop은 스타일 계산에만 쓰이고 HTML 엘리먼트에는 전달되지 않습니다.
 *
 * @example
 * const Box = styled("div", { shouldForwardProp })<{ $active?: boolean }>`
 *   color: ${({ $active, theme }) => $active ? theme.colors.main.purple : "inherit"};
 * `;
 */
export const shouldForwardProp = (prop: string) => !prop.startsWith("$");
