import React, { useCallback, useMemo, useState } from 'react';
import {
  CarOutlined,
  ExclamationCircleFilled,
  LoadingOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Menu, Modal, theme } from 'antd';
import { useGetMeQuery } from '../../redux/user';
import { useLogoutMutation } from '../../features/auth/redux';
import { useAppSelector } from '../../hooks';
import { S } from './HomePage.styles';

const { Sider, Content } = Layout;

const useLogout = () => {
  const [logout, { isLoading, isError, error }] = useLogoutMutation();
  const accessToken = useAppSelector(state => state.auth.accessToken);

  const _logout = useCallback(() => {
    Modal.confirm({
      title: 'Are you sure?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        logout(accessToken);
      },
    });
  }, [logout, accessToken]);

  return { logout: _logout, isLoading, isError, error };
};

const App: React.FC = () => {
  const {
    data: user,
    isLoading,
    refetch,
  } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { logout } = useLogout();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [topMenu, bottomMenu] = useMemo(
    () => [
      [
        {
          key: '1',
          icon: <UserOutlined />,
          label: 'Users',
        },
        {
          key: '2',
          icon: <CarOutlined />,
          label: 'Tracy',
        },
      ],
      [
        {
          key: '4',
          icon: <LogoutOutlined />,
          label: 'Logout',
          onClick: logout,
        },
      ],
    ],
    [logout],
  );

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <S.LogoContainer onClick={() => setCollapsed(!collapsed)}>
            <S.Logo src="assets/images/trasy-logo.png" />
            {collapsed || 'tracy'}
          </S.LogoContainer>
          <div style={{ flexGrow: 1 }}>
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={topMenu}
              selectable={false}
            />
          </div>
          <div>
            <Menu
              theme="dark"
              mode="inline"
              items={bottomMenu}
              selectable={false}
            />
          </div>
        </div>
      </Sider>
      <Layout>
        {/*TODO: get background from theme provider */}
        <S.Header background={colorBgContainer}>
          <div>
            {isLoading && <LoadingOutlined />}
            <Button onClick={refetch}>Refetch profile</Button>
          </div>
          <div>
            <Avatar
              src={user?.avatar}
              style={{ marginRight: '10px' }}
              icon={<UserOutlined />}
            />
            {!user?.name ? 'Loading...' : user?.name}
          </div>
        </S.Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export function HomePage() {
  return <App />;
}
