type NoteListItem = {
  id: number;
  title: string;
};

type Folder = {
  id: number;
  folderName: string;
  notes: NoteListItem[];
};

interface FolderProps {
  folder: Folder;
}

export { Folder, FolderProps };
