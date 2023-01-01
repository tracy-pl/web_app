import React, { useCallback, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  CarOutlined,
  LogoutOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';

import { Sizes } from 'shared/theme';
import { useGetMeQuery } from 'redux/user';
import { useLogout, useTranslation } from 'hooks';

import { S, OPENED_SIDEBAR_WIDTH, CLOSED_SIDEBAR_WIDTH } from './Layout.styles';

export const Layout = () => {
  const [siderCollapsed, setSiderCollapsed] = useState(false);
  const { data: user, isLoading: userIsLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useLogout();

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
  const handleMenuItemClick = useCallback(
    ({ key }) => navigate(key),
    [navigate],
  );
  const defaultSelectedKeys = useMemo(
    () => [location.pathname],
    [location.pathname],
  );

  return (
    <S.Spin spinning={userIsLoading}>
      <S.Layout>
        <S.Sider
          collapsible
          trigger={null}
          breakpoint={Sizes.LG}
          collapsed={siderCollapsed}
          width={OPENED_SIDEBAR_WIDTH}
          onBreakpoint={setSiderCollapsed}
          collapsedWidth={CLOSED_SIDEBAR_WIDTH}
        >
          <S.LogoContainer
            onClick={handleSiderToggle}
            $collapsed={siderCollapsed}
          >
            <S.Logo src="assets/images/trasy-logo.png" />
            {siderCollapsed || t('title')}
          </S.LogoContainer>
          <S.MenuContainer>
            <S.Menu
              items={menuItems}
              onSelect={handleMenuItemClick}
              defaultSelectedKeys={defaultSelectedKeys}
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
