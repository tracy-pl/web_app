import React, { useMemo } from 'react';
import { Button, Table } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import { Roles } from 'shared/types';
import { isAdmin } from 'shared/utils';
import { useGetUsersQuery } from 'features/admin/users/redux';

import { SkeletonTableWrapper } from 'components/SkeletonTableWrapper';

export function UsersPage() {
  const {
    data: users = [],
    refetch,
    isLoading,
    isFetching,
  } = useGetUsersQuery();

  const columns = useMemo(
    () => [
      {
        key: 'name',
        width: 200,
        title: 'Name',
        dataIndex: 'name',
      },
      {
        key: 'email',
        title: 'Email',
        dataIndex: 'email',
      },
      {
        key: 'role',
        title: 'Role',
        dataIndex: 'roles',
        render: (roles: Roles[]) => (isAdmin({ roles }) ? 'Admin' : 'User'),
      },
    ],
    [],
  );

  const isPaginationEnabled = useMemo(
    () => (users.length > 10 ? undefined : false),
    [users.length],
  );

  return (
    <>
      <Button
        onClick={refetch}
        disabled={isFetching}
        icon={<ReloadOutlined />}
        style={{ marginBottom: '10px' }}
      />
      <SkeletonTableWrapper loading={isLoading} columns={columns}>
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={users}
          loading={isFetching}
          pagination={isPaginationEnabled}
        />
      </SkeletonTableWrapper>
    </>
  );
}
