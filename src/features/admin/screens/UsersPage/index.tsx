import React, { useMemo } from 'react';
import { Button, Table } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import SkeletonTableWrapper from 'components/SkeletonTableWrapper';

import { useGetUsersQuery } from 'features/admin/redux';

export function UsersPage() {
  const { data: users = [], isLoading, refetch } = useGetUsersQuery();

  const columns = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
    ],
    [],
  );

  return (
    <>
      {users.length > 0 && (
        <Button
          style={{ marginBottom: '10px' }}
          icon={<ReloadOutlined />}
          onClick={refetch}
        />
      )}
      <SkeletonTableWrapper loading={isLoading} columns={columns}>
        <Table
          rowKey="_id"
          dataSource={users}
          columns={columns}
          pagination={users.length > 10 ? undefined : false}
        />
      </SkeletonTableWrapper>
    </>
  );
}
