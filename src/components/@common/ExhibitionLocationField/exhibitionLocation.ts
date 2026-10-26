import { CONSTRAINTS } from "@/constants/constraints";
import { getGraphemeLength } from "@/utils/getGraphemeLength";

export interface ExhibitionLocationValue {
  placeName: string;
  placeId: string;
  placeUrl: string;
}

export const validateExhibitionLocation = ({
  placeName,
  placeId,
  placeUrl,
}: ExhibitionLocationValue): true | string => {
  if (
    getGraphemeLength(placeName) >
    CONSTRAINTS.CREATE_SPACE.PLACE_NAME_MAX_LENGTH
  ) {
    return `전시 장소명은 ${CONSTRAINTS.CREATE_SPACE.PLACE_NAME_MAX_LENGTH}자 이하로 입력해 주세요.`;
  }

  if (Boolean(placeId) !== Boolean(placeUrl)) {
    return "장소 연결 정보를 다시 선택해 주세요.";
  }

  if ((placeId || placeUrl) && !placeName.trim()) {
    return "장소명을 입력하거나 등록된 장소를 제거해주세요.";
  }

  return true;
};

export const toExhibitionLocationPayload = ({
  placeName,
  placeId,
  placeUrl,
}: ExhibitionLocationValue): ExhibitionLocationValue => ({
  placeName: placeName.trim() ? placeName : "",
  placeId,
  placeUrl,
});
