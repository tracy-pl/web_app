import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userActions } from 'redux/user';
import { adminActions } from 'features/admin/redux';
import { authActions } from 'features/auth/redux';

const allActions = {
  ...userActions,
  ...authActions,
  ...adminActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch]);
};
