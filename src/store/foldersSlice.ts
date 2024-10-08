import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NoteListItem } from '@screens/HomeScreen/components/Folder/types';

export interface Folder {
  id: number;
  folderName: string;
  notes: NoteListItem[];
}

interface FoldersState {
  folders: Folder[];
}

const initialState: FoldersState = {
  folders: [],
};

const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolders: (state, action: PayloadAction<Folder[]>) => {
      state.folders = action.payload;
    },
    addFolder: (state, action: PayloadAction<Folder>) => {
      state.folders.push(action.payload);
    },
    addNoteToFolder: (
      state,
      action: PayloadAction<{ folderId: number; note: NoteListItem }>,
    ) => {
      const { folderId, note } = action.payload;
      const folder = state.folders.find(f => f.id === folderId);
      if (folder) {
        folder.notes.push(note);
      }
    },
    removeFolder: (state, action: PayloadAction<number>) => {
      state.folders = state.folders.filter(
        folder => folder.id !== action.payload,
      );
    },
  },
});

export const { setFolders, addFolder, addNoteToFolder, removeFolder } =
  foldersSlice.actions;

export default foldersSlice.reducer;
