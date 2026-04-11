import "@emotion/react";
import type { theme } from "../../styles/theme";

type AppTheme = typeof theme;

declare module "@emotion/react" {
  // NOTE: emotion augmentation 에서 interface extends는 멤버 없이 타입을 병합하는 유일한 방법
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends AppTheme {}
}
