import styled from "@emotion/styled";

export const Header = styled.div`
  padding: 12px 16px;
  text-align: center;
`;

export const Title = styled.h2`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
`;

export const CalendarWrapper = styled.div<{ $highlightToday: boolean }>`
  display: flex;
  justify-content: center;
  padding: 0 16px 8px;

  .rdp-root {
    --rdp-accent-color: ${({ theme }) => theme.colors.main.purple};
    --rdp-accent-background-color: ${({ theme }) => `${theme.colors.main.purple}33`};
    --rdp-today-color: ${({ theme }) => theme.colors.main.purple50};
    --rdp-range_start-color: ${({ theme }) => theme.colors.gray.white};
    --rdp-range_end-color: ${({ theme }) => theme.colors.gray.white};
    --rdp-range_middle-color: ${({ theme }) => theme.colors.gray.white};
    --rdp-disabled-opacity: 0.4;
    --rdp-outside-opacity: 0.4;
    --rdp-nav_button-disabled-opacity: 0.3;
    --rdp-day-width: 48px; /* TODO: 토큰 없음 - 캘린더 셀 크기 */
    --rdp-day-height: 48px; /* TODO: 토큰 없음 - 캘린더 셀 크기 */
    --rdp-day_button-width: 46px; /* TODO: 토큰 없음 - 캘린더 셀 크기 */
    --rdp-day_button-height: 46px; /* TODO: 토큰 없음 - 캘린더 셀 크기 */
    --rdp-nav_button-width: 2.5rem;
    --rdp-nav_button-height: 2.5rem;
  }

  .rdp-month_caption {
    justify-content: center;
    ${({ theme }) => ({ ...theme.typography.heading2 })};
    color: ${({ theme }) => theme.colors.gray.white};
  }

  .rdp-weekday {
    ${({ theme }) => ({ ...theme.typography.subBody })};
    color: ${({ theme }) => theme.colors.gray.gray400};
  }

  .rdp-day_button {
    ${({ theme }) => ({ ...theme.typography.body4 })};
    color: ${({ theme }) => theme.colors.gray.gray100};
  }

  .rdp-chevron {
    fill: ${({ theme }) => theme.colors.gray.gray200};
  }

  .rdp-today:not(.rdp-outside) .rdp-day_button {
    color: ${({ $highlightToday, theme }) =>
      $highlightToday ? theme.colors.main.purple : "inherit"};
  }
`;

export const Footer = styled.div`
  padding: 8px 16px 0;
`;
