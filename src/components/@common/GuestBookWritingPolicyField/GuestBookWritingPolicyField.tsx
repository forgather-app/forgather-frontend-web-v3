import styled from "@emotion/styled";
import type { GuestBookWritingPolicy } from "@/api/model";
import radioActive from "@/assets/icons/ic_radio_active.svg";
import radioInactive from "@/assets/icons/ic_radio_inactive.svg";

const Group = styled.fieldset`
  min-width: 0;
  border: 0;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  legend {
    padding: 0 0 8px 4px;
    ${({ theme }) => ({ ...theme.typography.label })};
    color: ${({ theme }) => theme.colors.gray.gray100};
  }
`;

const Option = styled.label<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid ${({ theme, $selected }) =>
    $selected ? theme.colors.main.purple50 : theme.colors.gray.gray500};
  border-radius: 8px;
  /* TODO: 토큰 없음 - 선택 항목 배경 */
  background-color: ${({ $selected }) =>
    $selected ? "rgba(98, 71, 255, 0.2)" : "transparent"};
  ${({ theme }) => ({ ...theme.typography.body4 })};
  color: ${({ theme }) => theme.colors.gray.gray100};
  cursor: pointer;
`;

const Radio = styled.input<{ $selected: boolean }>`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  margin: 0;
  cursor: pointer;
  background: url("${({ $selected }) => ($selected ? radioActive : radioInactive)}")
    center no-repeat;
  &&:focus-visible {
    border-radius: 50%;
    outline: 2px solid ${({ theme }) => theme.colors.main.purple50};
    outline-offset: 4px;
  }
`;

export default function GuestBookWritingPolicyField({
  value,
  onChange,
}: {
  value: GuestBookWritingPolicy;
  onChange: (value: GuestBookWritingPolicy) => void;
}) {
  return (
    <Group>
      <legend>방명록 작성 기간</legend>
      {(
        [
          ["ALWAYS", "항상 작성 가능"],
          ["EXHIBITION_PERIOD", "전시 기간에만 작성 가능"],
        ] as const
      ).map(([policy, label]) => (
        <Option key={policy} $selected={value === policy}>
          {label}
          <Radio
            $selected={value === policy}
            type="radio"
            name="guestBookWritingPolicy"
            value={policy}
            checked={value === policy}
            onChange={() => onChange(policy)}
          />
        </Option>
      ))}
    </Group>
  );
}
