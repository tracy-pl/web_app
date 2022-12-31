import styled from 'styled-components';
import {
  Button,
  Menu as AntdMenu,
  Spin as AntdSpin,
  Layout as AntdLayout,
} from 'antd';
import { ThemePropsWith } from 'shared/theme';

type CollapsedProps = ThemePropsWith<{ $collapsed: boolean }>;

const LOGO_SIZE = 56;
export const OPENED_SIDEBAR_WIDTH = 300;
export const CLOSED_SIDEBAR_WIDTH = 100;

export namespace S {
  export const LogoContainer = styled.div`
    font-size: 40px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: ${({ $collapsed }: CollapsedProps) =>
      $collapsed ? 'center' : 'start'};
    gap: 10px;
    cursor: pointer;
    margin: ${({ $collapsed, theme }: CollapsedProps) =>
      `${theme.spacings.md}px ${
        $collapsed ? theme.spacings.xs : theme.spacings.md
      }px 0`}};
  `;

  export const Logo = styled.img`
    height: ${LOGO_SIZE}px;
    width: ${LOGO_SIZE}px;
    object-fit: contain;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
  `;

  export const LogoutButton = styled(Button)`
    margin: ${({ $collapsed, theme }: CollapsedProps) =>
      `0 ${$collapsed ? theme.spacings.sm : theme.spacings.md}px ${
        theme.spacings.md
      }px`}};
  `;

  export const Layout = styled(AntdLayout)`
    height: 100vh;
  `;

  export const Sider = styled(AntdLayout.Sider)`
    & > div {
      gap: ${({ theme }) => theme.spacings.xl}px;
      padding: ${({ theme }) => theme.spacings.md}px !important;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: ${({ theme }) => theme.colors.background};
      border-right: 1px solid ${({ theme }) => theme.colors.border};
    }
  `;

  export const Content = styled(AntdLayout.Content)`
    width: 100%;
    min-height: 280px;
    margin: ${({ theme }) => theme.spacings.xl}px;
    padding: ${({ theme }) => theme.spacings.xl}px;
    background: ${({ theme }) => theme.colors.background};
    border-radius: 12px;
  `;

  export const MenuContainer = styled.div`
    ul {
      border-inline-end: none !important;
    }
  `;

  export const Menu = styled(AntdMenu)`
    background: ${({ theme }) => theme.colors.background};
  `;

  export const Spin = styled(AntdSpin)`
    max-height: 100% !important;
  `;
}
