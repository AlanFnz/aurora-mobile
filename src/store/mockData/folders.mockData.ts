import { Folder } from '@screens/HomeScreen/components/Folder/types';

const foldersMockData: Folder[] = [
  {
    id: 1,
    folderName: 'Personal',
    notes: [
      {
        id: 1,
        title: 'Meeting Notes',
        snippet: 'Discuss project timeline and deadlines. Need to assign...',
      },
      { id: 2, title: 'Shopping List', snippet: '' },
      {
        id: 3,
        title: 'React Native Tips',
        snippet: 'Remember to optimize images, use FlatList for better...',
      },
    ],
  },
  {
    id: 2,
    folderName: 'Work',
    notes: [
      {
        id: 4,
        title: 'Travel Itinerary',
        snippet: 'Day 1: Arrival and city tour. Day 2: Visit the museum...',
      },
    ],
  },
];

export default foldersMockData;
