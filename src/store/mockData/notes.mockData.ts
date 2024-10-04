import { Note } from '@store/notesSlice';

const mockNotes: Note[] = [
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
  {
    id: 5,
    title: 'Books to Read',
    content:
      'Neuromancer by William Gibson, Dune by Frank Herbert, The Alchemist by Paulo Coelho.',
    folderId: 2,
  },
  {
    id: 6,
    title: 'Workout Plan',
    content:
      'Day 1: Chest and triceps. Day 2: Back and biceps. Day 3: Legs and core.',
    folderId: 3,
  },
  {
    id: 7,
    title: 'Recipe Ideas',
    content:
      'Pasta carbonara, chicken curry, vegetarian tacos, grilled salmon with veggies.',
    folderId: 2,
  },
  {
    id: 8,
    title: 'App Ideas',
    content:
      'A mindfulness journaling app, a recipe sharing platform, a personal finance tracker.',
    folderId: 1,
  },
  {
    id: 9,
    title: 'Coding Resources',
    content:
      'React documentation, Redux Toolkit examples, TypeScript tutorials, CSS tricks.',
    folderId: 3,
  },
  {
    id: 10,
    title: 'Mindfulness Reminders',
    content:
      'Take deep breaths, focus on the present moment, let go of intrusive thoughts.',
    folderId: 1,
  },
];

export default mockNotes;
