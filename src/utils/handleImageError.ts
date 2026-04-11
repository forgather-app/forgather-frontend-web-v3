export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackImageSrc: string,
) => {
  e.currentTarget.src = fallbackImageSrc;
};
