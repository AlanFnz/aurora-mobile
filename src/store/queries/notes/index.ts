import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Note } from '@store/activeNoteSlice';
import notesMockData from '@store/mockData/notes.mockData';

export const noteApi = createApi({
  reducerPath: 'noteApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: builder => ({
    fetchNoteDetails: builder.query<Note, number>({
      queryFn: noteId => {
        const note = notesMockData.find(n => n.id === noteId);
        if (note) {
          return { data: note };
        } else {
          return {
            error: {
              status: 404,
              data: { message: 'Note not found' },
            },
          };
        }
      },
    }),
  }),
});

export const { useFetchNoteDetailsQuery } = noteApi;
