import * as S from "./Layout.styles";

interface LayoutProps {
  /** 레이아웃 내부에 렌더링될 콘텐츠 */
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <S.Wrapper>{children}</S.Wrapper>;
};

export default Layout;
