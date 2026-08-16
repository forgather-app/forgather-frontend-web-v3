import QRCode from "qrcode";
import { useEffect, useState } from "react";
import IcAlert from "@/assets/icons/ic_alert.svg?react";
import BottomSheet from "@/components/@common/BottomSheet/BottomSheet";
import Button from "@/components/@common/Button/Button";
import useSaveImageBridge from "@/hooks/@common/useSaveImageBridge";
import { theme } from "@/styles/theme";
import * as S from "./QrBottomSheetContent.styles";

const QR_SIZE = 172;

interface QrBottomSheetContentProps {
  /** 바텀시트 열림 여부. true일 때 마운트되어야 합니다 (`{isOpen && <QrBottomSheetContent />}` 패턴 사용). */
  isOpen: boolean;
  /** 닫힘 애니메이션 종료 후 호출되는 콜백. 부모에서 isOpen을 false로 전환해 언마운트합니다. */
  onClose: () => void;
  /** QR 코드로 인코딩할 값(링크 등) */
  qrValue: string;
}

const QrBottomSheetContent = ({
  isOpen,
  onClose,
  qrValue,
}: QrBottomSheetContentProps) => {
  const { saveImage } = useSaveImageBridge();
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    QRCode.toDataURL(qrValue, {
      width: QR_SIZE,
      margin: 0,
      color: { dark: theme.colors.semantic.black },
    })
      .then((url) => {
        if (!isCancelled) setQrImageUrl(url);
      })
      .catch(() => {
        if (!isCancelled) setHasError(true);
      });

    return () => {
      isCancelled = true;
    };
  }, [qrValue]);

  const handleSaveImage = () => {
    if (!qrImageUrl) return;
    saveImage({ url: qrImageUrl, filename: "forgather-qr.png" });
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <S.Wrapper>
        <S.QrArea>
          {hasError ? (
            <S.ErrorState aria-hidden="true">
              <S.ErrorBackground />
              <IcAlert
                width={40}
                height={40}
                color={theme.colors.semantic.alertRed}
              />
            </S.ErrorState>
          ) : (
            qrImageUrl && (
              <S.QrCard>
                <img
                  src={qrImageUrl}
                  alt="스페이스 초대 QR 코드"
                  width={QR_SIZE}
                  height={QR_SIZE}
                />
              </S.QrCard>
            )
          )}
        </S.QrArea>
        <S.ButtonWrapper>
          <Button
            variant="tertiary"
            text="이미지 저장"
            onClick={handleSaveImage}
            disabled={!qrImageUrl}
          />
        </S.ButtonWrapper>
      </S.Wrapper>
    </BottomSheet>
  );
};

export default QrBottomSheetContent;
