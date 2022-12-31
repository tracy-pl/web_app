import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { appActions } from 'redux/app';
import { userActions } from 'redux/user';
import { authActions } from 'features/auth/redux';
import { usersActions } from 'features/admin/users/redux';

const allActions = {
  ...appActions,
  ...userActions,
  ...authActions,
  // FOR ADMIN
  ...usersActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch]);
};
