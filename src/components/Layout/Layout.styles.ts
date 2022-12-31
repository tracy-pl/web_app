import styled from 'styled-components';
import {
  Button,
  Menu as AntdMenu,
  Spin as AntdSpin,
  Layout as AntdLayout,
} from 'antd';

export namespace S {
  export const LogoContainer = styled.div`
    height: 64px;
    font-size: 40px;
    margin-bottom: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
  `;

  export const Logo = styled.img`
    height: 35px;
    width: 35px;
    object-fit: contain;
    border-radius: 25px;
  `;

  export const LogoutButton = styled(Button)`
    margin: 16px;
  `;

  export const Layout = styled(AntdLayout)`
    height: 100vh;
  `;

  export const Sider = styled(AntdLayout.Sider)`
    & > div {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: ${({ theme }) => theme.colors.background};
    }
  `;

  export const Content = styled(AntdLayout.Content)`
    height: 100%;
    width: 100%;
    margin: 16px;
    padding: 24px;
    min-height: 280px;
    background: ${({ theme }) => theme.colors.background};
  `;

  export const MenuContainer = styled.div``;

  export const Menu = styled(AntdMenu)`
    border: 0 !important;
    background: ${({ theme }) => theme.colors.background};
  `;

  export const Spin = styled(AntdSpin)`
    max-height: 100% !important;
  `;
}
