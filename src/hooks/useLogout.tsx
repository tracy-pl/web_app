import React, { useCallback } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

import { useAppSelector } from './useAppSelector';
import { useLogoutMutation } from '../features/auth/redux';

export const useLogout = () => {
  const [_logout, { isLoading, isError, error }] = useLogoutMutation();
  const accessToken = useAppSelector(state => state.auth.accessToken);

  const logout = useCallback(() => {
    Modal.confirm({
      title: 'Are you sure?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        _logout(accessToken);
      },
    });
  }, [_logout, accessToken]);

  return { logout, isLoading, isError, error };
};
