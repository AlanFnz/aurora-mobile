import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  id: number;
  title: string;
  content?: string;
  folderId: number;
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

const selectedNoteSlice = createSlice({
  name: 'selectedNote',
  initialState,
  reducers: {
    selectNoteStart: state => {
      state.loading = true;
      state.error = null;
    },
    selectNoteSuccess: (state, action: PayloadAction<Note>) => {
      state.selectedNote = action.payload;
      state.loading = false;
    },
    selectNoteFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearSelectedNote: state => {
      state.selectedNote = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  selectNoteStart,
  selectNoteSuccess,
  selectNoteFailure,
  clearSelectedNote,
} = selectedNoteSlice.actions;

export default selectedNoteSlice.reducer;
