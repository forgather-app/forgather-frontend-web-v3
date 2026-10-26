import styled from "@emotion/styled";
import type { GuestBookWritingPolicy } from "@/api/model";

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
  gap: 12px;
  padding: 14px;
  border: 1px solid ${({ theme, $selected }) =>
    $selected ? theme.colors.main.purple50 : theme.colors.gray.gray500};
  border-radius: 8px;
  background-color: ${({ theme, $selected }) =>
    $selected ? "rgba(98, 71, 255, 0.1)" : theme.colors.gray.gray600};
  ${({ theme }) => ({ ...theme.typography.subBody })};
  font-weight: ${({ $selected }) => ($selected ? 700 : 400)};
  color: ${({ theme }) => theme.colors.gray.gray100};
  cursor: pointer;
`;

const Radio = styled.input<{ $selected: boolean }>`
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin: 0;
  border-radius: 50%;
  cursor: pointer;
  &&,
  &&:focus {
    border: ${({ $selected }) => ($selected ? 2 : 1)}px solid
      ${({ theme, $selected }) =>
        $selected ? theme.colors.main.purple50 : theme.colors.gray.gray300};
    background-color: transparent;
    background-image: ${({ theme, $selected }) =>
      $selected
        ? `radial-gradient(circle, ${theme.colors.main.purple50} 0 5px, transparent 5px)`
        : "none"};
  }
  &&:focus-visible {
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
          <Radio
            $selected={value === policy}
            type="radio"
            name="guestBookWritingPolicy"
            value={policy}
            checked={value === policy}
            onChange={() => onChange(policy)}
          />
          {label}
        </Option>
      ))}
    </Group>
  );
}
