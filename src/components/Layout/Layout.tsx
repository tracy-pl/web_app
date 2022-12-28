import React, { useMemo, useState } from 'react';
import {
  CarOutlined,
  CrownOutlined,
  LoadingOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Layout as AntdLayout, Menu, theme } from 'antd';

import { isAdminSelector, useGetMeQuery } from 'redux/user';
import { useAppSelector, useLogout } from 'hooks';

import { S } from './Layout.styles';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Sider, Content } = AntdLayout;

export const Layout = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { token } = theme.useToken();
  const isAdmin = useAppSelector(isAdminSelector);
  const { data: user, isLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [siderCollapsed, setSiderCollapsed] = useState(false);

  const [topMenu, bottomMenu] = useMemo(
    () => [
      [
        isAdmin
          ? {
              key: '/users',
              label: 'Users',
              icon: <UserOutlined />,
            }
          : null,
        {
          key: '/tracy',
          label: 'Tracy',
          icon: <CarOutlined />,
        },
      ],
      [
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: 'Logout',
          onClick: logout,
        },
      ],
    ],
    [isAdmin, logout],
  );
  const handleSiderToggle = () => setSiderCollapsed(!siderCollapsed);

  return (
    <AntdLayout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={siderCollapsed}>
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <S.LogoContainer onClick={handleSiderToggle}>
            <S.Logo src="assets/images/trasy-logo.png" />
            {siderCollapsed || 'tracy'}
          </S.LogoContainer>
          <div style={{ flexGrow: 1 }}>
            <Menu
              theme="dark"
              items={topMenu}
              defaultSelectedKeys={[pathname]}
              onSelect={({ key }) => navigate(key)}
            />
          </div>
          <div>
            <Menu theme="dark" items={bottomMenu} />
          </div>
        </div>
      </Sider>
      <AntdLayout>
        {/*TODO: get background from theme provider */}
        <S.Header background={token.colorBgContainer}>
          <div>{isLoading && <LoadingOutlined />}</div>
          <div>
            <Avatar
              src={user?.avatar}
              style={{ marginRight: '10px' }}
              icon={isAdmin ? <CrownOutlined /> : <UserOutlined />}
            />
            {!user?.name ? 'Loading...' : user?.name}
          </div>
        </S.Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: token.colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
};
