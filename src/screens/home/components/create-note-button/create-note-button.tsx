import React from 'react'
import { ActivityIndicator, TouchableWithoutFeedback } from 'react-native'

import colors from '@theme/colors'

import { useCreateNoteButton } from './hooks/use-create-note-button'
import {
  AnimatedButtonContainer,
  FullCircleIcon,
  PlusIcon,
} from './create-note-button.styled'

interface CreateNoteButtonProps {
  testID?: string
}

export const CreateNoteButton: React.FC<CreateNoteButtonProps> = ({
  testID,
}) => {
  const {
    isLongPressed,
    isUploading,
    animatedStyles,
    handlePressIn,
    handlePressOut,
    handleLongPress,
  } = useCreateNoteButton()

  const renderButton = () => {
    const stateMap = {
      uploading: (
        <ActivityIndicator size="small" color={colors.common.darkGray} />
      ),
      longPressed: <FullCircleIcon color={colors.lowOpacity.redMid} />,
      default: <PlusIcon color={colors.common.darkGray} />,
    }

    if (isUploading) return stateMap.uploading
    if (isLongPressed) return stateMap.longPressed
    return stateMap.default
  }

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={handleLongPress}>
      <AnimatedButtonContainer style={animatedStyles} testID={testID}>
        {renderButton()}
      </AnimatedButtonContainer>
    </TouchableWithoutFeedback>
  )
}
