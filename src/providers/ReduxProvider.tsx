import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from 'redux/store';
import { ParentComponent } from 'types';

export const ReduxProvider: ParentComponent = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={'Loading...'} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
