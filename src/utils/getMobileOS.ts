export type MobileOS = "ios" | "android" | "unknown";

export const getMobileOS = (userAgent: string): MobileOS => {
  if (/iPhone|iPad|iPod/i.test(userAgent)) return "ios";
  if (/Android/i.test(userAgent)) return "android";
  return "unknown";
};
