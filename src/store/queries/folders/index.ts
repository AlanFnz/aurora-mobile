import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Folder } from '@store/foldersSlice';
import foldersMockData from '@store/mockData/folders.mockData';

export const foldersApi = createApi({
  reducerPath: 'foldersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: builder => ({
    fetchFolders: builder.query<Folder[], void>({
      queryFn: () => {
        return { data: foldersMockData };
      },
    }),
  }),
});

export const { useFetchFoldersQuery } = foldersApi;
