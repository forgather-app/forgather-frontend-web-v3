import { Global, ThemeProvider } from "@emotion/react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";
import { global } from "@/styles/global";
import { theme } from "@/styles/theme";
import GuestBookWritingPolicyField from "./GuestBookWritingPolicyField";

afterEach(cleanup);

it("기본 라디오 모양이 없어도 옵션 테두리와 선택 표시를 그린다", () => {
  const { rerender } = render(
    <ThemeProvider theme={theme}>
      <Global styles={global(theme)} />
      <GuestBookWritingPolicyField value="ALWAYS" onChange={() => {}} />
    </ThemeProvider>,
  );
  const always = screen.getByRole("radio", { name: "항상 작성 가능" });
  const period = screen.getByRole("radio", { name: "전시 기간에만 작성 가능" });
  const alwaysOption = always.closest("label");
  const periodOption = period.closest("label");
  if (!alwaysOption || !periodOption) throw new Error("옵션 라벨이 없습니다");
  expect(getComputedStyle(alwaysOption).borderTopWidth).toBe("1px");
  expect(getComputedStyle(always).borderTopStyle).toBe("solid");
  expect(getComputedStyle(always).backgroundImage).not.toBe(
    getComputedStyle(period).backgroundImage,
  );
  const selectedBackground = getComputedStyle(alwaysOption).backgroundColor;
  rerender(
    <ThemeProvider theme={theme}>
      <Global styles={global(theme)} />
      <GuestBookWritingPolicyField
        value="EXHIBITION_PERIOD"
        onChange={() => {}}
      />
    </ThemeProvider>,
  );
  expect(period).toBeChecked();
  expect(getComputedStyle(periodOption).backgroundColor).toBe(
    selectedBackground,
  );
  expect(getComputedStyle(alwaysOption).backgroundColor).not.toBe(
    selectedBackground,
  );
});
