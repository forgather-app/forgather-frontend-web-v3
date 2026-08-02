export const getImageUrl = (path: string): string => {
  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL ?? "";
  return `${baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};
