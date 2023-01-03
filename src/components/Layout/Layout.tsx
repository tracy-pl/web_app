import React, { useCallback, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  CarOutlined,
  LogoutOutlined,
  UserOutlined,
  HomeOutlined,
} from '@ant-design/icons';

import { Sizes } from 'shared/theme';
import { persistor } from 'redux/store';
import { useGetMeQuery } from 'redux/user';
import { useLogout, usePersistState, useTranslation } from 'hooks';

import { S, OPENED_SIDEBAR_WIDTH, CLOSED_SIDEBAR_WIDTH } from './Layout.styles';

const SIDER_COLLAPSED_STATE_KEY = 'siderCollapsed';

export const Layout = () => {
  const [siderCollapsed, setSiderCollapsed] = usePersistState(
    SIDER_COLLAPSED_STATE_KEY,
    false,
  );
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
  const handleLogout = useCallback(() => {
    logout();
    persistor.purge().catch(console.error);
  }, [logout]);
  const handleSiderToggle = useCallback(
    () => setSiderCollapsed(prev => !prev),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );
  const handleMenuItemClick = useCallback(
    ({ key }) => navigate(key),
    [navigate],
  );
  const defaultSelectedKeys = useMemo(
    () => [location.pathname],
    [location.pathname],
  );
  const handleOnBreakpoint = useCallback(broken => {
    if (siderCollapsed) return;
    setSiderCollapsed(broken);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <S.Spin spinning={userIsLoading}>
      <S.Layout>
        <S.Sider
          collapsible
          trigger={null}
          breakpoint={Sizes.LG}
          collapsed={siderCollapsed}
          width={OPENED_SIDEBAR_WIDTH}
          onBreakpoint={handleOnBreakpoint}
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
            onClick={handleLogout}
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
