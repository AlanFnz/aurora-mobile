import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export type RootStackParamList = {
  Home: undefined
  SignIn: undefined
  SignUp: undefined
  AuthStack: undefined
  NoteDetails: {
    noteId?: number
    isNew?: boolean
    preFilledData?: {
      title: string
      content: string
      audioUrl?: string
    }
  }
}

export type NoteDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'NoteDetails'
>

export type NoteDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'NoteDetails'
>
