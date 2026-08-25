import { useEffect, useRef, useState } from "react";
import Button from "@/components/@common/Button/Button";
import {
  CROP_MAX_SCALE,
  CROP_OUTPUT_SIZE,
  CROP_WHEEL_ZOOM_STEP,
  CROP_WINDOW_SIZE,
} from "@/pages/profileEdit/constants/imageCropper.constants";
import {
  clampScale,
  clampTranslate,
  getCropSourceRect,
  getMinScale,
  type Point,
  type Size,
} from "@/pages/profileEdit/utils/cropGeometry";
import * as S from "./ImageCropper.styles";

interface CropTransform {
  scale: number;
  translate: Point;
}

interface ImageCropperProps {
  /** 크롭할 원본 이미지 URL */
  imageUrl: string;
  /** 저장하기 클릭 시 크롭된 이미지 전달 */
  onSave: (image: Blob) => void;
}

const ImageCropper = ({ imageUrl, onSave }: ImageCropperProps) => {
  const gestureRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const pointersRef = useRef(new Map<number, Point>());

  const [baseSize, setBaseSize] = useState<Size | null>(null);
  const [transform, setTransform] = useState<CropTransform>({
    scale: 1,
    translate: { x: 0, y: 0 },
  });

  const minScale = baseSize ? getMinScale(baseSize, CROP_WINDOW_SIZE) : 1;

  const applyTransform = (updater: (prev: CropTransform) => CropTransform) => {
    if (!baseSize) return;
    setTransform((prev) => {
      const next = updater(prev);
      const scale = clampScale(next.scale, minScale, CROP_MAX_SCALE);
      return {
        scale,
        translate: clampTranslate(
          next.translate,
          baseSize,
          scale,
          CROP_WINDOW_SIZE,
        ),
      };
    });
  };

  const handleImageLoad = () => {
    const gesture = gestureRef.current;
    const image = imageRef.current;
    if (!gesture || !image || image.naturalWidth === 0) return;

    const width = gesture.clientWidth;
    const base = {
      width,
      height: width * (image.naturalHeight / image.naturalWidth),
    };
    setBaseSize(base);
    setTransform({
      scale: Math.max(1, getMinScale(base, CROP_WINDOW_SIZE)),
      translate: { x: 0, y: 0 },
    });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const pointers = pointersRef.current;
    const previous = pointers.get(e.pointerId);
    if (!previous) return;
    const current = { x: e.clientX, y: e.clientY };

    if (pointers.size === 1) {
      // 드래그: 이동
      applyTransform(({ scale, translate }) => ({
        scale,
        translate: {
          x: translate.x + current.x - previous.x,
          y: translate.y + current.y - previous.y,
        },
      }));
    } else if (pointers.size === 2) {
      // 핀치: 두 포인터 거리 비율만큼 확대·축소
      const other = [...pointers.entries()].find(
        ([id]) => id !== e.pointerId,
      )?.[1];
      if (other) {
        const previousDistance = Math.hypot(
          previous.x - other.x,
          previous.y - other.y,
        );
        const currentDistance = Math.hypot(
          current.x - other.x,
          current.y - other.y,
        );
        if (previousDistance > 0) {
          applyTransform(({ scale, translate }) => ({
            scale: (scale * currentDistance) / previousDistance,
            translate,
          }));
        }
      }
    }
    pointers.set(e.pointerId, current);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(e.pointerId);
  };

  useEffect(() => {
    const gesture = gestureRef.current;
    if (!gesture || !baseSize) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const direction = e.deltaY < 0 ? 1 : -1;
      setTransform((prev) => {
        const scale = clampScale(
          prev.scale * (1 + direction * CROP_WHEEL_ZOOM_STEP),
          minScale,
          CROP_MAX_SCALE,
        );
        return {
          scale,
          translate: clampTranslate(
            prev.translate,
            baseSize,
            scale,
            CROP_WINDOW_SIZE,
          ),
        };
      });
    };

    // NOTE: React onWheel은 passive라 preventDefault가 불가하여 직접 등록
    gesture.addEventListener("wheel", handleWheel, { passive: false });
    return () => gesture.removeEventListener("wheel", handleWheel);
  }, [baseSize, minScale]);

  const handleSave = () => {
    const image = imageRef.current;
    const windowEl = windowRef.current;
    if (!image || !windowEl) return;

    const { sx, sy, size } = getCropSourceRect(
      image.getBoundingClientRect(),
      windowEl.getBoundingClientRect(),
      image.naturalWidth,
    );

    const canvas = document.createElement("canvas");
    canvas.width = CROP_OUTPUT_SIZE;
    canvas.height = CROP_OUTPUT_SIZE;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.drawImage(
      image,
      sx,
      sy,
      size,
      size,
      0,
      0,
      CROP_OUTPUT_SIZE,
      CROP_OUTPUT_SIZE,
    );
    canvas.toBlob(
      (blob) => {
        if (blob) onSave(blob);
      },
      "image/webp",
      0.92,
    );
  };

  const { scale, translate } = transform;

  return (
    <S.Backdrop>
      <S.GestureArea
        ref={gestureRef}
        role="application"
        aria-label="프로필 이미지 크롭. 드래그로 이동, 핀치 또는 휠로 확대·축소"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <S.CropImage
          ref={imageRef}
          src={imageUrl}
          alt="크롭할 프로필 이미지"
          draggable={false}
          onLoad={handleImageLoad}
          style={{
            width: baseSize?.width,
            visibility: baseSize ? "visible" : "hidden",
            transform: `translate(-50%, -50%) translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
          }}
        />
        <S.Overlay>
          <S.CropWindow ref={windowRef} aria-hidden="true" />
          <S.Guide>동그라미 안에 이미지를 맞춰주세요</S.Guide>
        </S.Overlay>
      </S.GestureArea>
      <S.Footer>
        <Button text="저장하기" onClick={handleSave} />
      </S.Footer>
    </S.Backdrop>
  );
};

export default ImageCropper;
