import { Folder } from '@screens/HomeScreen/components/Folder/types'

const foldersMockData: Folder[] = [
  {
    id: 1,
    folderName: 'Personal',
    notes: [
      {
        id: 1,
        title: 'Meeting Notes',
        snippet: 'Discuss project timeline and deadlines. Need to assign...',
        modifiedDate: 1696896000000,
      },
      {
        id: 2,
        title: 'Shopping List',
        snippet: '',
        modifiedDate: 1696809600000,
      },
      {
        id: 3,
        title: 'React Native Tips',
        snippet: 'Remember to optimize images, use FlatList for better...',
        modifiedDate: 1696723200000,
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
        modifiedDate: 1696636800000,
      },
    ],
  },
]

export default foldersMockData
