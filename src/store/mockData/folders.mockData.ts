import { Folder } from '../../screens/HomeScreen/components/Folder';

const foldersMockData: Folder[] = [
  {
    id: 1,
    folderName: 'Personal',
    notes: [
      { id: 1, title: 'Meeting Notes' },
      { id: 2, title: 'Shopping List' },
      { id: 3, title: 'React Native Tips' },
    ],
  },
  {
    id: 2,
    folderName: 'Work',
    notes: [{ id: 4, title: 'Travel Itinerary' }],
  },
];

export default foldersMockData;
