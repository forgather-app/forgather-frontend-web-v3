import * as S from "./Divider.styles";

/**
 * 좌우 화면 끝까지 확장되는 풀블리드 구분선.
 *
 * 부모 요소가 `overflow-y: auto`인 스크롤 컨테이너일 경우, 해당 컨테이너에
 * `margin: 0 -{sidePadding}px; padding: 0 {sidePadding}px;`를 함께 적용해야
 * 음수 마진이 잘리지 않고 화면 끝까지 확장됩니다.
 */
interface DividerProps {
  /** 구분선 색상 */
  color: string;
  /** 구분선 두께(px) */
  height: number;
  /** 구분선 위쪽 여백(px) */
  marginTop?: number;
}

const Divider = ({ color, height, marginTop = 0 }: DividerProps) => {
  return (
    <S.Divider
      $color={color}
      $height={height}
      $marginTop={marginTop}
      aria-hidden="true"
    />
  );
};

export default Divider;
