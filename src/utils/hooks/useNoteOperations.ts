import { useDispatch } from 'react-redux';

import {
  useCreateNoteMutation,
  useUpdateNoteMutation,
} from '@store/queries/notes';
import { addNoteToFolder } from '@store/foldersSlice';

export const useNoteOperations = () => {
  const dispatch = useDispatch();
  const [createNote] = useCreateNoteMutation();
  const [updateNoteMutation] = useUpdateNoteMutation();

  const createNewNote = async ({
    title,
    content,
    folderId,
  }: {
    title: string;
    content: string;
    folderId: number | null;
  }) => {
    if (!folderId) return;
    const createdNote = await createNote({
      title,
      content,
      folderId,
    }).unwrap();

    dispatch(
      addNoteToFolder({
        folderId,
        note: {
          id: createdNote.id,
          title: createdNote.title,
          snippet: createdNote.content ? createdNote.content.slice(0, 50) : '',
          modifiedDate: createdNote.modifiedDate,
        },
      }),
    );

    return createdNote;
  };

  const updateNote = async ({
    id,
    title,
    content,
  }: {
    id: number;
    title: string;
    content: string;
  }) => {
    if (!id) return;
    const updatedNote = await updateNoteMutation({
      id,
      title,
      content,
    }).unwrap();

    return updatedNote;
  };

  return { createNewNote, updateNote };
};
