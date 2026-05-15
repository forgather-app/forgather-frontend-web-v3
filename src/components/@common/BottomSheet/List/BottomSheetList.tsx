import type { ReactNode } from "react";
import * as S from "./BottomSheetList.styles";

type CommonProps = {
  /** 클릭 핸들러 */
  onClick?: () => void;
};

type BottomSheetListProps = CommonProps &
  (
    | {
        /** 목록 항목 제목 */
        title: string;
        /** 제목 왼쪽에 표시할 아이콘 */
        icon: ReactNode;
        /** 제목 아래에 표시할 설명 */
        description: string;
      }
    | {
        /** 목록 항목 제목 */
        title: string;
        icon?: undefined;
        description?: undefined;
      }
  );

const BottomSheetList = ({
  title,
  icon,
  description,
  onClick,
}: BottomSheetListProps) => {
  return (
    <S.Container
      onClick={onClick}
      aria-label={description ? `${title}, ${description}` : title}
    >
      <S.TitleRow>
        {icon && <S.IconWrapper aria-hidden="true">{icon}</S.IconWrapper>}
        <S.Title>{title}</S.Title>
      </S.TitleRow>
      {description && <S.Description>{description}</S.Description>}
    </S.Container>
  );
};

export default BottomSheetList;
