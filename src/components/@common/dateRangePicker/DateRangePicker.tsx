import { css, Global, useTheme } from "@emotion/react";
import type { DateRange } from "react-day-picker";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

interface DateRangePickerProps {
  selected?: DateRange;
  onSelect?: (range: DateRange | undefined) => void;
}

const DateRangePicker = ({ selected, onSelect }: DateRangePickerProps) => {
  const { colors, typography } = useTheme();

  const globalStyles = css`
    .rdp-root {
      --rdp-accent-color: ${colors.main.purple};
      --rdp-accent-background-color: rgba(98, 71, 255, 0.2);
      --rdp-range_middle-background-color: rgba(98, 71, 255, 0.15);
      --rdp-range_middle-color: ${colors.gray.white};
      --rdp-range_start-color: ${colors.gray.white};
      --rdp-range_end-color: ${colors.gray.white};
      --rdp-today-color: ${colors.main.purple};
      --rdp-day_button-border-radius: 8px;
      --rdp-day-width: 40px;
      --rdp-day-height: 40px;
      --rdp-day_button-width: 36px;
      --rdp-day_button-height: 36px;

      color: ${colors.gray.gray100};
      background-color: ${colors.gray.gray600};
      border-radius: 12px;
      padding: 16px;
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .rdp-caption_label {
      font-size: ${typography.body1.fontSize};
      font-weight: ${typography.body1.fontWeight};
      letter-spacing: ${typography.body1.letterSpacing};
      color: ${colors.gray.white};
    }

    .rdp-weekday {
      color: ${colors.gray.gray300};
      font-size: ${typography.caption.fontSize};
      font-weight: ${typography.caption.fontWeight};
    }

    .rdp-chevron {
      fill: ${colors.gray.gray300};
    }

    .rdp-day_button:hover:not(:disabled) {
      background-color: rgba(98, 71, 255, 0.15);
    }

    .rdp-outside {
      opacity: 0.4;
    }
  `;

  return (
    <>
      <Global styles={globalStyles} />
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={onSelect}
        navLayout="around"
      />
    </>
  );
};

export default DateRangePicker;
export type { DateRange };
