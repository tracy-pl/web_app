import React, { useCallback, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  CarOutlined,
  LogoutOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';

import { useGetMeQuery } from 'redux/user';
import { useLogout, useTranslation } from 'hooks';

import { S, OPENED_SIDEBAR_WIDTH, CLOSED_SIDEBAR_WIDTH } from './Layout.styles';

export const Layout = () => {
  const { t } = useTranslation();
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const { data: user, isLoading: userIsLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const menuItems = useMemo(
    () => [
      {
        key: '/',
        label: t('sidebar.home'),
        icon: <HomeOutlined />,
      },
      user?.isAdmin
        ? {
            key: '/users',
            label: t('sidebar.users'),
            icon: <UserOutlined />,
          }
        : null,
      {
        key: '/tracy',
        label: t('sidebar.tracks'),
        icon: <CarOutlined />,
      },
    ],
    [t, user?.isAdmin],
  );
  const handleSiderToggle = useCallback(
    () => setSiderCollapsed(prev => !prev),
    [],
  );

  return (
    <S.Spin spinning={userIsLoading}>
      <S.Layout>
        <S.Sider
          collapsible
          trigger={null}
          width={OPENED_SIDEBAR_WIDTH}
          collapsedWidth={CLOSED_SIDEBAR_WIDTH}
          collapsed={siderCollapsed}
        >
          <S.LogoContainer
            $collapsed={siderCollapsed}
            onClick={handleSiderToggle}
          >
            <S.Logo src="assets/images/trasy-logo.png" />
            {siderCollapsed || t('title')}
          </S.LogoContainer>
          <S.MenuContainer>
            <S.Menu
              items={menuItems}
              defaultSelectedKeys={[pathname]}
              onSelect={({ key }) => navigate(key)}
            />
          </S.MenuContainer>
          <S.LogoutButton
            onClick={logout}
            icon={<LogoutOutlined />}
            $collapsed={siderCollapsed}
          >
            {siderCollapsed || t('sidebar.logoutBtn')}
          </S.LogoutButton>
        </S.Sider>
        <S.Content>
          <Outlet />
        </S.Content>
      </S.Layout>
    </S.Spin>
  );
};
