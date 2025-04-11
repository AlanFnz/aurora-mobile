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

interface NoteSwipeActionsProps {
  dragX: SharedValue<number>
  onEdit: () => void
  onDelete: () => void
}

export const NoteSwipeActions: React.FC<NoteSwipeActionsProps> = ({
  dragX,
  onEdit,
  onDelete,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      dragX.value,
      [-120, 0],
      [0, 120],
      Extrapolation.CLAMP,
    )
    return {
      transform: [{ translateX }],
    }
  })

  return (
    <AnimatedActionsContainer style={animatedStyle}>
      <ActionButton onPress={onEdit}>
        <Icon name="pencil" />
      </ActionButton>
      <ActionButton onPress={onDelete}>
        <Icon name="trash" danger />
      </ActionButton>
    </AnimatedActionsContainer>
  )
}

const StyledContainer = styled.View`
  width: 120px;
  flex-direction: row;
`

const AnimatedActionsContainer = Animated.createAnimatedComponent(
  StyledContainer,
) as React.ComponentType<ViewProps & { style?: any }>

const ActionButton = styled.TouchableOpacity<{ danger?: boolean }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ danger }: { danger?: boolean }) =>
    danger
      ? colors.lowOpacity.feedback.negative
      : colors.lowOpacity.feedback.positive};
`

const Icon = styled(FontAwesome).attrs<{
  name: string
}>(() => ({
  size: 20,
  color: '#fff',
}))``
