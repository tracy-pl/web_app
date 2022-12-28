import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchBaseQueryWithAuth } from 'redux/utils/fetchBaseQueryWithAuth';
import { IUser } from 'types/models';

export const adminApi = createApi({
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

export const { useGetUsersQuery } = adminApi;
