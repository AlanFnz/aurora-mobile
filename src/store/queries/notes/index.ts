import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import notesMockData from '@store/mockData/notes.mockData';

export interface Note {
  id: number;
  title: string;
  content?: string;
  folderId: number;
  modifiedDate: number;
}

interface SelectedNoteState {
  selectedNote: Note | null;
  loading: boolean;
  error: string | null;
}

const initialState: SelectedNoteState = {
  selectedNote: null,
  loading: false,
  error: null,
};

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
    updateNote: builder.mutation<Note, Partial<Note> & { id?: number }>({
      queryFn: updatedNote => {
        const index = notesMockData.findIndex(n => n.id === updatedNote.id);
        if (index === -1) {
          return {
            error: {
              status: 404,
              data: { message: 'Note not found' },
            },
          };
        }

        notesMockData[index] = { ...notesMockData[index], ...updatedNote };

        return { data: notesMockData[index] };
      },
    }),
  }),
});

export const { useFetchNoteDetailsQuery, useUpdateNoteMutation } = noteApi;
