import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { Mutex } from 'async-mutex';

import { HTTP_STATUS } from 'shared/http';
import { API_BASE_URL } from 'constants/http';
import { authApi } from 'features/auth/redux';

import { RootState } from '../store';

const mutex = new Mutex();
export const fetchBaseQueryWithAuth: (
  baseUrl: string,
  withBaseApiUrl?: boolean,
) => BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = (
  baseUrl,
  withBaseApiUrl = true,
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: withBaseApiUrl ? API_BASE_URL + baseUrl : baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const { accessToken } = state.auth;

      if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }
      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === HTTP_STATUS.UNAUTHORIZED) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        // TODO: rewrite to get token in request builder
        const authState = (api.getState() as RootState).auth;
        try {
          const resp = await api.dispatch(
            authApi.endpoints.refreshToken.initiate(authState.refreshToken),
          );
          // @ts-ignore
          if (!resp.data?.acessToken) throw new Error('No access token');

          result = await baseQuery(args, api, extraOptions);
        } catch (e) {
          api.dispatch(
            authApi.endpoints.logout.initiate(authState.accessToken),
          );
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();

        result = await baseQuery(args, api, extraOptions);
      }
    }

    return result;
  };
};
