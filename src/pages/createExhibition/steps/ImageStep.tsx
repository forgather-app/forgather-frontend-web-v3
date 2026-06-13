import { useEffect, useMemo, useState } from "react";
import ImageInput from "@/components/@common/imageInput/ImageInput";

interface ImageStepProps {
  onImageChange: (image: Blob | null) => void;
}

const ImageStep = ({ onImageChange }: ImageStepProps) => {
  const [image, setImage] = useState<Blob | null>(null);

  const previewUrl = useMemo(
    () => (image ? URL.createObjectURL(image) : null),
    [image],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleChange = (newImage: Blob | null) => {
    setImage(newImage);
    onImageChange(newImage);
  };

  return <ImageInput previewImage={previewUrl} onChange={handleChange} />;
};

export default ImageStep;
