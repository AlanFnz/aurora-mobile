import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  AuthStack: undefined;
  NoteDetails: { noteId: number };
};

export type NoteDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NoteDetails'
>;

export type NoteDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'NoteDetails'
>;
