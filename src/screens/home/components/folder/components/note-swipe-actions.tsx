import React from 'react'
import Animated, {
  useAnimatedStyle,
  interpolate,
  SharedValue,
  Extrapolation,
} from 'react-native-reanimated'
import styled from 'styled-components/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ViewProps } from 'react-native'
import colors from '@theme/colors'

const CONTAINER_WIDTH = 80

interface NoteSwipeActionsProps {
  dragX: SharedValue<number>
  onDelete: () => void
}

export const NoteSwipeActions: React.FC<NoteSwipeActionsProps> = ({
  dragX,
  onDelete,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      dragX.value,
      [-CONTAINER_WIDTH, 0],
      [0, CONTAINER_WIDTH],
      Extrapolation.CLAMP,
    )
    return {
      transform: [{ translateX }],
    }
  })

  return (
    <AnimatedActionsContainer style={animatedStyle}>
      <ActionButton onPress={onDelete}>
        <Icon name="trash" danger />
      </ActionButton>
    </AnimatedActionsContainer>
  )
}

const StyledContainer = styled.View`
  width: ${CONTAINER_WIDTH}px;
  flex-direction: row;
`

const AnimatedActionsContainer = Animated.createAnimatedComponent(
  StyledContainer,
) as React.ComponentType<ViewProps & { style?: any }>

const ActionButton = styled.TouchableOpacity<{ danger?: boolean }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.lowOpacity.feedback.negative};
  border-radius: 8px;
`

const Icon = styled(FontAwesome).attrs<{
  name: string
}>(() => ({
  size: 20,
  color: '#fff',
}))``
