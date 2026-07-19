import { useEffect, useMemo, useState } from "react";
import Button from "@/components/@common/Button/Button";
import ImageInput from "@/components/@common/imageInput/ImageInput";
import ItemLayout from "@/shared/funnel/ItemLayout";

interface ImageStepProps {
  onNext: (data: { image: Blob | null }) => void;
}

const ImageStep = ({ onNext }: ImageStepProps) => {
  const [image, setImage] = useState<Blob | null>(null);
  const changeImage = (newImage: Blob | null) => {
    setImage(newImage);
  };
  const previewUrl = useMemo(
    () => (image ? URL.createObjectURL(image) : null),
    [image],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <ItemLayout
      button={
        <Button
          text="다음"
          disabled={!image}
          onClick={() => onNext({ image })}
        />
      }
    >
      <ImageInput
        previewImage={previewUrl}
        onChange={(newImage) => changeImage(newImage)}
      />
    </ItemLayout>
  );
};

export default ImageStep;
