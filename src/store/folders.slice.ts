import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { NoteListItem } from '@screens/home/components/folder/types'

export interface Folder {
  id: number
  folderName: string
  notes: NoteListItem[]
}

type FoldersState = Folder[]

const initialState: FoldersState = []

const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolders: (state, action: PayloadAction<Folder[]>) => action.payload,
    addFolder: (state, action: PayloadAction<Folder>) => {
      state.push(action.payload)
    },
    addNoteToFolder: (
      state,
      action: PayloadAction<{ folderId: number; note: NoteListItem }>,
    ) => {
      const { folderId, note } = action.payload
      const folder = state.find(f => f.id === folderId)
      if (folder) {
        folder.notes.push(note)
      }
    },
    removeFolder: (state, action: PayloadAction<number>) =>
      state.filter(folder => folder.id !== action.payload),
  },
})

export const { setFolders, addFolder, addNoteToFolder, removeFolder } =
  foldersSlice.actions

export default foldersSlice.reducer
