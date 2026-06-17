import { CONSTRAINTS } from "@/constants/constraints";
import { getGraphemeLength } from "@/utils/getGraphemeLength";

export const validateArtistName = (name: string): boolean => {
  const length = getGraphemeLength(name.trim());
  return length > 0 && length <= CONSTRAINTS.SIGN_UP.ARTIST_NAME_MAX_LENGTH;
};
