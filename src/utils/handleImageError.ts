export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackImageSrc: string,
) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = fallbackImageSrc;
};
