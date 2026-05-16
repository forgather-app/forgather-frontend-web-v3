import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import Button from "../components/@common/button/Button";
import Modal from "../components/ui/modal/Modal";
import { theme } from "../styles/theme";

const meta: Meta<typeof Modal> = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100dvh",
          backgroundColor: theme.colors.gray.gray700,
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
모달 컴포넌트입니다. Compound Pattern으로 구성되어 있어 유연하게 조합할 수 있습니다.

**구성 요소**
- \`Modal\`: 루트 컴포넌트. 컨텍스트를 통해 상태를 하위 컴포넌트에 전달합니다.
- \`Modal.Overlay\`: 반투명 배경. 클릭 시 모달을 닫습니다. \`disableClose\`로 닫기 동작을 막을 수 있습니다.
- \`Modal.Content\`: 모달 패널. 중앙에 고정되며 fade + scale 애니메이션이 적용됩니다.

**Props**
- \`closeOnEsc\` (기본값: \`true\`): ESC 키로 모달을 닫을 수 있는지 여부.

**사용 패턴**
\`isOpen\` 상태를 그대로 Modal에 내려주면 됩니다. 조건부 렌더링이 필요 없습니다.

\`\`\`tsx
const [isOpen, setIsOpen] = useState(false);

<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <Modal.Overlay />
  <Modal.Content>
    {/* 원하는 내용 */}
  </Modal.Content>
</Modal>
\`\`\`
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

const triggerButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "10px 20px",
  backgroundColor: theme.colors.main.purple,
  color: theme.colors.gray.white,
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontFamily: "SUIT, sans-serif",
  fontSize: 14,
};

const modalBodyStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 24,
  alignItems: "center",
};

const textSectionStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
};

const actionRowStyle: React.CSSProperties = {
  display: "flex",
  gap: 16,
  width: "100%",
};

const MonoStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        style={triggerButtonStyle}
        onClick={() => setIsOpen(true)}
      >
        모달 열기
      </button>
      <Modal isOpen={isOpen} onClose={close}>
        <Modal.Overlay />
        <Modal.Content>
          <div style={modalBodyStyle}>
            <div style={textSectionStyle}>
              <span
                style={{
                  color: theme.colors.gray.white,
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "SUIT, sans-serif",
                }}
              >
                새 전시 공간 만들기
              </span>
              <span
                style={{
                  color: theme.colors.gray.gray200,
                  fontSize: 12,
                  fontFamily: "SUIT, sans-serif",
                }}
              >
                새 전시 공간을 만드시겠어요?
              </span>
            </div>
            <div style={actionRowStyle}>
              <Button
                variant="tertiary"
                text="취소"
                onClick={close}
                style={{ flex: 1 }}
              />
              <Button
                variant="primary"
                text="새로 만들기"
                onClick={close}
                style={{ flex: 1 }}
              />
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export const Mono: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "기본 모달입니다. ESC 키 또는 오버레이 클릭으로 닫을 수 있습니다.",
      },
    },
  },
  render: () => <MonoStory />,
};

const DisableCloseStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        style={triggerButtonStyle}
        onClick={() => setIsOpen(true)}
      >
        모달 열기 (오버레이·ESC 닫기 막힘)
      </button>
      <Modal isOpen={isOpen} onClose={close} closeOnEsc={false}>
        <Modal.Overlay disableClose />
        <Modal.Content>
          <div style={modalBodyStyle}>
            <div style={textSectionStyle}>
              <span
                style={{
                  color: theme.colors.gray.white,
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "SUIT, sans-serif",
                }}
              >
                오버레이·ESC로 닫기 불가
              </span>
              <span
                style={{
                  color: theme.colors.gray.gray200,
                  fontSize: 12,
                  fontFamily: "SUIT, sans-serif",
                }}
              >
                버튼을 눌러야만 닫힙니다
              </span>
            </div>
            <div style={actionRowStyle}>
              <Button
                variant="tertiary"
                text="취소"
                onClick={close}
                style={{ flex: 1 }}
              />
              <Button
                variant="primary"
                text="확인"
                onClick={close}
                style={{ flex: 1 }}
              />
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export const DisableClose: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "`Modal.Overlay`에 `disableClose`, `Modal`에 `closeOnEsc={false}`를 전달하면 오버레이 클릭과 ESC 키 모두 닫기가 비활성화됩니다.",
      },
    },
  },
  render: () => <DisableCloseStory />,
};

const StackedModalsStory = () => {
  const [isFirstOpen, setIsFirstOpen] = useState(false);
  const [isSecondOpen, setIsSecondOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        style={triggerButtonStyle}
        onClick={() => setIsFirstOpen(true)}
      >
        모달 열기
      </button>

      <Modal isOpen={isFirstOpen} onClose={() => setIsFirstOpen(false)}>
        <Modal.Overlay />
        <Modal.Content>
          <div style={modalBodyStyle}>
            <div style={textSectionStyle}>
              <span
                style={{
                  color: theme.colors.gray.white,
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "SUIT, sans-serif",
                }}
              >
                첫 번째 모달
              </span>
              <span
                style={{
                  color: theme.colors.gray.gray200,
                  fontSize: 12,
                  fontFamily: "SUIT, sans-serif",
                }}
              >
                아래 버튼으로 두 번째 모달을 열 수 있습니다
              </span>
            </div>
            <div style={actionRowStyle}>
              <Button
                variant="tertiary"
                text="닫기"
                onClick={() => setIsFirstOpen(false)}
                style={{ flex: 1 }}
              />
              <Button
                variant="primary"
                text="다음 모달 열기"
                onClick={() => setIsSecondOpen(true)}
                style={{ flex: 1 }}
              />
            </div>
          </div>
        </Modal.Content>
      </Modal>

      <Modal isOpen={isSecondOpen} onClose={() => setIsSecondOpen(false)}>
        <Modal.Content>
          <div style={modalBodyStyle}>
            <div style={textSectionStyle}>
              <span
                style={{
                  color: theme.colors.gray.white,
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: "SUIT, sans-serif",
                }}
              >
                이 방명록을 삭제하시겠습니까?
              </span>
              <span
                style={{
                  color: theme.colors.gray.gray200,
                  fontSize: 12,
                  fontFamily: "SUIT, sans-serif",
                }}
              >
                삭제한 방명록은 되돌릴 수 없어요
              </span>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div
                style={{
                  backgroundColor: theme.colors.gray.gray700,
                  borderRadius: 8,
                  padding: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                {[
                  { label: "작성자", value: "현주 짱짱이" },
                  {
                    label: "내용",
                    value:
                      "그동안 고생 많았어! 작업 멋지다. 언제든 연락해 밥 한 번 살게~!",
                  },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <span
                      style={{
                        color: theme.colors.gray.gray400,
                        fontSize: 14,
                        fontFamily: "SUIT, sans-serif",
                      }}
                    >
                      {label}
                    </span>
                    <span
                      style={{
                        color: theme.colors.gray.gray100,
                        fontSize: 14,
                        fontFamily: "SUIT, sans-serif",
                      }}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div style={actionRowStyle}>
              <Button
                variant="tertiary"
                text="취소"
                onClick={() => setIsSecondOpen(false)}
                style={{ flex: 1 }}
              />
              <Button
                variant="primary"
                text="삭제하기"
                onClick={() => setIsSecondOpen(false)}
                style={{ flex: 1 }}
              />
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export const StackedModals: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "모달이 여러 개 쌓이는 경우입니다. 두 번째 모달은 `Modal.Overlay` 없이 `Modal.Content`만 렌더하고, 첫 번째 모달의 Overlay를 공유합니다. 컨텐츠 양이 달라 자연스럽게 크기가 다르게 보입니다.",
      },
    },
  },
  render: () => <StackedModalsStory />,
};
