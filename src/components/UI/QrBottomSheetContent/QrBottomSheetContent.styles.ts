import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 8px;
`;

export const QrArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 64px 0;
`;

export const QrCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.gray.white};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
`;

export const ErrorState = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 172px;
  height: 172px;
  flex-shrink: 0;
`;

export const ErrorBackground = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.gray.gray500};
  opacity: 0.4;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  padding: 0 16px;
`;
