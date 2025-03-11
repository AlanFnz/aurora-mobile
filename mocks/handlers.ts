import { http, HttpResponse, RequestHandler } from 'msw'
import { Folder } from '@services/folder'
import { Note } from '@services/note'
import { API_URL } from '@env'

const mockFolders: Folder[] = [
  { id: 1, folderName: 'Work', notes: [] },
  { id: 2, folderName: 'Personal', notes: [] },
]

const mockNotes: Note[] = [
  {
    id: 1,
    title: 'Meeting Notes',
    content: 'Discuss project updates',
    folderId: 1,
    modifiedDate: Date.now(),
  },
  {
    id: 2,
    title: 'Grocery List',
    content: 'Milk, eggs, bread',
    folderId: 2,
    modifiedDate: Date.now(),
  },
]

export const folderHandlers = [
  http.get(`${API_URL}/api/folders`, () => HttpResponse.json(mockFolders)),
  http.post(`${API_URL}/api/folders`, () => HttpResponse.json(mockFolders[0])),
  http.delete(`${API_URL}/api/folders/:folderId`, () =>
    HttpResponse.json({ success: true }),
  ),
]

export const noteHandlers = [
  http.get(`${API_URL}/api/notes/:id`, () => HttpResponse.json(mockNotes[0])),
  http.post(`${API_URL}/api/notes`, () => HttpResponse.json(mockNotes[0])),
  http.put(`${API_URL}/api/notes/:id`, () => HttpResponse.json(mockNotes[0])),
  http.delete(`${API_URL}/api/notes/:id`, () =>
    HttpResponse.json({ success: true }),
  ),
]

export const handlers: RequestHandler[] = [...folderHandlers, ...noteHandlers]
