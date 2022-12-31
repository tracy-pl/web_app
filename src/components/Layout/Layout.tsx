import React, { useCallback, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { CarOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';

import { useLogout } from 'hooks';
import { useGetMeQuery } from 'redux/user';

import { S } from './Layout.styles';

export const Layout = () => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const { data: user, isLoading: userIsLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menuItems = useMemo(
    () => [
      user?.isAdmin
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
    [user?.isAdmin],
  );
  const handleSiderToggle = useCallback(
    () => setSiderCollapsed(prev => !prev),
    [],
  );

  return (
    <S.Spin spinning={userIsLoading}>
      <S.Layout>
        <S.Sider collapsible trigger={null} collapsed={siderCollapsed}>
          <S.LogoContainer onClick={handleSiderToggle}>
            <S.Logo src="assets/images/trasy-logo.png" />
            {siderCollapsed || 'tracy'}
          </S.LogoContainer>
          <S.MenuContainer>
            <S.Menu
              items={menuItems}
              defaultSelectedKeys={[pathname]}
              onSelect={({ key }) => navigate(key)}
            />
          </S.MenuContainer>
          <S.LogoutButton icon={<LogoutOutlined />} onClick={logout}>
            {siderCollapsed || 'Logout'}
          </S.LogoutButton>
        </S.Sider>
        <S.Content>
          <Outlet />
        </S.Content>
      </S.Layout>
    </S.Spin>
  );
};
