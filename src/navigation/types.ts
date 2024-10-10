import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  AuthStack: undefined;
  NoteDetail: { noteId: number };
};

export type NoteDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NoteDetail'
>;

export type NoteDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'NoteDetail'
>;
