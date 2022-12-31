import { setupListeners } from '@reduxjs/toolkit/query';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';

import { appReducer } from './app';
import { userReducer, userApi } from './user';
import { authReducer, authApi } from 'features/auth/redux';
import { usersApi, usersReducer } from 'features/admin/users/redux';

const defaultMiddlewareConfig = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
};

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  [usersApi.reducerPath]: usersApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  // FOR ADMIN
  users: usersReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const setupStore = () => {
  return configureStore({
    devTools: process.env.NODE_ENV !== 'production',
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware(defaultMiddlewareConfig).concat([
        authApi.middleware,
        userApi.middleware,
        // FOR ADMIN
        usersApi.middleware,
      ]),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

const store = setupStore();
const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
