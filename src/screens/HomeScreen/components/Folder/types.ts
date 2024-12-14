type NoteListItem = {
  id: number
  title: string
  snippet: string
  modifiedDate: number
}

type Folder = {
  id: number
  folderName: string
  notes: NoteListItem[]
}

interface FolderProps {
  folder: Folder
}

export { NoteListItem, Folder, FolderProps }
