import { createApi } from '@reduxjs/toolkit/query/react';

import { IUser } from 'types/models';
import { fetchBaseQueryWithAuth } from 'redux/utils';

export const usersApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQueryWithAuth('/users'),
  endpoints: builder => ({
    getUsers: builder.query<IUser[], void>({
      query() {
        return {
          url: '/',
        };
      },
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
