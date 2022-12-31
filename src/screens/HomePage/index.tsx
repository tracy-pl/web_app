import React from 'react';
import { Avatar } from 'antd';
import { CrownOutlined, UserOutlined } from '@ant-design/icons';

import { useAppSelector } from 'hooks';
import { isAdmin as isAdminSelector, useGetMeQuery } from 'redux/user';

export function HomePage() {
  const { data: user } = useGetMeQuery();
  const isAdmin = useAppSelector(isAdminSelector);

  return user ? (
    <div>
      <Avatar
        src={user.avatar}
        style={{ marginRight: '10px' }}
        icon={isAdmin ? <CrownOutlined /> : <UserOutlined />}
      />
      {user.name}
    </div>
  ) : null;
}
