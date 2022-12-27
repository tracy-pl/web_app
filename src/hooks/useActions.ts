import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userActions } from 'redux/user';

const allActions = {
  ...userActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch]);
};
