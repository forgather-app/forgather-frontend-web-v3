import QRCode from "qrcode";
import { useEffect, useState } from "react";
import IcAlert from "@/assets/icons/ic_alert.svg?react";
import BottomSheet from "@/components/@common/BottomSheet/BottomSheet";
import Button from "@/components/@common/Button/Button";
import useSaveImageBridge from "@/hooks/@common/useSaveImageBridge";
import { theme } from "@/styles/theme";
import * as S from "./QrBottomSheetContent.styles";

const QR_CONTENT_SIZE = 172;
const QR_PADDING = 16;
const QR_RADIUS = 16;
const QR_CANVAS_SIZE = QR_CONTENT_SIZE + QR_PADDING * 2;

const drawRoundedRectPath = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
};

const generateQrImage = async (value: string) => {
  const qrCanvas = await QRCode.toCanvas(value, {
    width: QR_CONTENT_SIZE,
    margin: 0,
    color: { dark: `${theme.colors.gray.gray200}FF`, light: "#00000000" },
  });

  const canvas = document.createElement("canvas");
  canvas.width = QR_CANVAS_SIZE;
  canvas.height = QR_CANVAS_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas context unavailable");

  ctx.save();
  drawRoundedRectPath(ctx, 0, 0, QR_CANVAS_SIZE, QR_CANVAS_SIZE, QR_RADIUS);
  ctx.clip();
  ctx.fillStyle = theme.colors.gray.gray700;
  ctx.fillRect(0, 0, QR_CANVAS_SIZE, QR_CANVAS_SIZE);
  ctx.drawImage(qrCanvas, QR_PADDING, QR_PADDING);
  ctx.restore();

  return canvas.toDataURL("image/png");
};

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

    generateQrImage(qrValue)
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
    <BottomSheet isOpen={isOpen} onClose={onClose} maxContentHeight="none">
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
              <img
                src={qrImageUrl}
                alt="스페이스 초대 QR 코드"
                width={QR_CANVAS_SIZE}
                height={QR_CANVAS_SIZE}
              />
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
