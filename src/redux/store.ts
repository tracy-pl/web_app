import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';
import { userReducer, userApi } from './user';
import { authReducer, authApi } from 'features/auth/redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/es/constants';

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
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  auth: authReducer,
  user: userReducer,
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
      ]),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

const store = setupStore();
const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
