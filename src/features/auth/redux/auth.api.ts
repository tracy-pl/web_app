import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IGenericResponse } from 'types';
import { API_BASE_URL } from 'constants/api';
import { userActions, userApi } from 'redux/user';

import { LoginPayload, RegisterPayload } from '../types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/auth`,
  }),
  endpoints: builder => ({
    register: builder.mutation<IGenericResponse, RegisterPayload>({
      query(data) {
        return {
          url: '/register',
          method: 'POST',
          body: data,
        };
      },
    }),
    login: builder.mutation<
      { accessToken: string; refreshToken: string },
      LoginPayload
    >({
      query(data) {
        return {
          url: '/login',
          method: 'POST',
          body: data,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(
            userApi.endpoints.getMe.initiate(undefined, {
              forceRefetch: true,
            }),
          );
        } catch (error) {}
      },
    }),
    logout: builder.mutation<void, string | null>({
      query(accessToken) {
        return {
          url: '/logout',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      async onQueryStarted(args, { dispatch }) {
        dispatch(userActions.logout());
      },
    }),
    refreshToken: builder.mutation<
      { accessToken: string; refreshToken: string },
      string | null
    >({
      query(refreshToken) {
        return {
          url: '/refresh',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
