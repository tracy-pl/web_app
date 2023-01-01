import React, { useMemo } from 'react';
import { Button, Table } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import SkeletonTableWrapper from 'components/SkeletonTableWrapper';

import { useGetUsersQuery } from 'features/admin/users/redux';

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
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 200,
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
          loading={isFetching || isLoading}
          pagination={users.length > 10 ? undefined : false}
        />
      </SkeletonTableWrapper>
    </>
  );
}
