import { useState } from "react";
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
  const previewUrl = image ? URL.createObjectURL(image) : null;

  return (
    <ItemLayout text="다음" disabled={!image} onClick={() => onNext({ image })}>
      <ImageInput
        previewImage={previewUrl}
        onChange={(newImage) => changeImage(newImage)}
      />
    </ItemLayout>
  );
};

export default ImageStep;
