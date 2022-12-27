import { createApi } from '@reduxjs/toolkit/query/react';

import { IUser } from 'types/models';

import { userActions } from './user.slice';
import { fetchBaseQueryWithAuth } from '../utils/fetchBaseQueryWithAuth';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQueryWithAuth('/users'),
  endpoints: builder => ({
    getMe: builder.query<IUser, void>({
      query() {
        return {
          url: '/profile',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          dispatch(userActions.authenticate(data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetMeQuery } = userApi;
