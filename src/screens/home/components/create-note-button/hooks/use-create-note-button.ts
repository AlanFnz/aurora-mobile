import { useRef, useState } from 'react'
import { Animated } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { NoteDetailScreenNavigationProp } from '@navigation/types'
import { DialogType, useDialog } from '@context/dialog'
import { useNoteOperations } from '@hooks/use-note-operations'
import { useAudioRecorder } from '@hooks/use-audio-recorder'
import { useFileUpload } from '@hooks/use-file-upload'
import { useToast } from '@hooks/use-toast'

const pressAnimationDuration = 190
const releaseAnimationDuration = 150

export const useCreateNoteButton = () => {
  const navigation = useNavigation<NoteDetailScreenNavigationProp>()

  const { startRecording, stopRecording, isRecording } = useAudioRecorder()
  const { isUploading, uploadFile } = useFileUpload()
  const { createNewNote } = useNoteOperations()
  const { showDialog } = useDialog()
  const { showToast } = useToast()

  const [isLongPressed, setIsLongPressed] = useState(false)

  const bottomPositionAnim = useRef(new Animated.Value(25)).current
  const opacityAnim = useRef(new Animated.Value(0.9)).current
  const heightAnim = useRef(new Animated.Value(50)).current
  const translateYAnim = useRef(new Animated.Value(0)).current

  const handleNewNote = () =>
    navigation.navigate('NoteDetails', { isNew: true })

  const handlePressIn = () => {
    Animated.timing(opacityAnim, {
      toValue: 0.2,
      duration: 100,
      useNativeDriver: false,
    }).start()
  }

  const handleLongPress = async () => {
    setIsLongPressed(true)
    Animated.parallel([
      Animated.timing(bottomPositionAnim, {
        toValue: 25,
        duration: pressAnimationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(translateYAnim, {
        toValue: -5,
        duration: pressAnimationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.9,
        duration: pressAnimationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(heightAnim, {
        toValue: 70,
        duration: pressAnimationDuration,
        useNativeDriver: false,
      }),
    ]).start()

    await startRecording()
  }

  const handlePressOut = async () => {
    Animated.parallel([
      Animated.timing(bottomPositionAnim, {
        toValue: 25,
        duration: releaseAnimationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: pressAnimationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.9,
        duration: releaseAnimationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(heightAnim, {
        toValue: 50,
        duration: releaseAnimationDuration,
        useNativeDriver: false,
      }),
    ]).start()
    setIsLongPressed(false)

    if (isLongPressed) {
      const recordingResult = await stopRecording()
      if (recordingResult) {
        try {
          const resultUrl = await uploadFile(recordingResult)
          showDialog(
            DialogType.FolderSelection,
            async ({ folderId, noteTitle, newFolderName }) => {
              try {
                await createNewNote({
                  title: noteTitle || 'New audio note',
                  content: '',
                  audioUrl: resultUrl,
                  folderId: folderId || null,
                  newFolderName,
                })
                showToast({
                  isSuccess: true,
                  message: 'Note created successfully!',
                  additionalOffset: 70,
                })
              } catch (error) {
                console.error(error)
                showToast({
                  isSuccess: false,
                  message: 'Failed to create note.',
                  additionalOffset: 70,
                })
              }
            },
            { allowTitleEdit: true },
          )
        } catch (error) {
          console.error('Failed to upload audio file:', error)
          showToast({
            isSuccess: false,
            message: 'Failed to upload file.',
            additionalOffset: 70,
          })
        }
      }
    } else handleNewNote()
  }
  const animatedStyles = {
    height: heightAnim,
    bottom: bottomPositionAnim,
    opacity: opacityAnim,
    transform: [{ translateY: translateYAnim }, { translateX: -35 }],
  }

  return {
    isLongPressed,
    isRecording,
    isUploading,
    animatedStyles,
    handlePressIn,
    handlePressOut,
    handleLongPress,
  }
}
