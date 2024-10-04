import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  id: number;
  title: string;
  content: string;
  folderId: number;
}

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    updateNote: (
      state,
      action: PayloadAction<{ id: number; updates: Omit<Partial<Note>, 'id'> }>,
    ) => {
      const { id, updates } = action.payload;
      const note = state.notes.find(n => n.id === id);
      if (note) {
        Object.assign(note, updates);
      }
    },
    removeNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
    removeNotesByFolder: (state, action: PayloadAction<number>) => {
      const folderId = action.payload;
      state.notes = state.notes.filter(note => note.folderId !== folderId);
    },
  },
});

export const {
  setNotes,
  addNote,
  updateNote,
  removeNote,
  removeNotesByFolder,
} = notesSlice.actions;

export default notesSlice.reducer;
