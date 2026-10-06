import styled from "@emotion/styled";

export const ModalInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 20px 20px;
`;

export const Title = styled.p`
  ${({ theme }) => ({ ...theme.typography.heading2 })};
  padding-right: 28px;
  color: ${({ theme }) => theme.colors.gray.gray50};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.gray.gray300};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    border-radius: 4px;
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.gray.gray300};

  p {
    margin: 0;
  }
`;

export const BulletList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding-left: 0.9em;
    text-indent: -0.9em;
  }

  li::before {
    content: "· ";
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CheckboxWrapper = styled.div`
  position: relative;
  width: 28px;
  height: 28px;
  flex-shrink: 0;

  &:has(input:focus-visible) > span {
    outline: 2px solid ${({ theme }) => theme.colors.main.purple};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const HiddenInput = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
  margin: 0;
  width: 100%;
  height: 100%;
`;

// 체크 전에는 회색(gray500), 체크 후에는 보라색 배경. 체크마크 아이콘은 항상 표시됩니다.
export const CheckIcon = styled.span<{ $checked: boolean }>`
  position: absolute;
  inset: 16.67%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $checked }) =>
    $checked ? theme.colors.main.purple : theme.colors.gray.gray500};
  transition: background-color 0.15s;

  svg {
    color: ${({ theme }) => theme.colors.gray.gray200};
  }
`;

export const CheckboxLabel = styled.label`
  ${({ theme }) => ({ ...theme.typography.subBody })};
  color: ${({ theme }) => theme.colors.gray.gray300};
  cursor: pointer;
`;
