import { Note } from '@store/activeNoteSlice';

const notesMockData: Note[] = [
  {
    id: 1,
    title: 'Meeting Notes',
    content:
      'Discuss project timeline and deadlines. Need to assign tasks for the upcoming sprint.',
    folderId: 1,
  },
  {
    id: 2,
    title: 'Shopping List',
    content: 'Eggs, milk, bread, coffee, apples, bananas, spinach.',
    folderId: 2,
  },
  {
    id: 3,
    title: 'React Native Tips',
    content:
      'Remember to optimize images, use FlatList for performance with large data sets.',
    folderId: 3,
  },
  {
    id: 4,
    title: 'Travel Itinerary',
    content:
      'Day 1: Arrival and city tour. Day 2: Visit the museum and the local market. Day 3: Hiking trip.',
    folderId: 1,
  },
];

export default notesMockData;
