import styled from 'styled-components';
import { Layout } from 'antd';

export namespace S {
  export const LogoContainer = styled.div`
    height: 64px;
    font-size: 40px;
    color: white;
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

  export const Header = styled(Layout.Header)`
    background: ${({ background }: { background: string }) =>
      background}!important;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;
}
