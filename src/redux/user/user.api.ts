import { createApi } from '@reduxjs/toolkit/query/react';

import { Roles } from 'shared/types';
import { IUser } from 'types/models';

import { userActions } from './user.slice';
import { fetchBaseQueryWithAuth } from '../utils';

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
      transformResponse: (user: IUser) => {
        user.isAdmin = user.roles.includes(Roles.ADMIN);

        return user;
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
