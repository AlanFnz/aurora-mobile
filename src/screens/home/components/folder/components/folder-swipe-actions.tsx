import React from 'react'
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  SharedValue,
} from 'react-native-reanimated'
import styled from 'styled-components/native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { ViewProps } from 'react-native'
import colors from '@theme/colors'

const CONTAINER_WIDTH = 100

interface FolderSwipeActionsProps {
  dragX: SharedValue<number>
  onEdit: () => void
  onDelete: () => void
}

export const FolderSwipeActions: React.FC<FolderSwipeActionsProps> = ({
  dragX,
  onEdit,
  onDelete,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      dragX.value,
      [-CONTAINER_WIDTH, 0],
      [0, CONTAINER_WIDTH],
      Extrapolate.CLAMP,
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
      <ActionButton onPress={onDelete} isDelete>
        <Icon name="trash" />
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

const ActionButton = styled.TouchableOpacity<{ isDelete?: boolean }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 10px;

  ${({ isDelete }: { isDelete?: boolean }) =>
    isDelete
      ? `
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        `
      : `
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        `}

  background-color: ${({ isDelete }: { isDelete?: boolean }) =>
    isDelete
      ? colors.lowOpacity.feedback.negative
      : colors.lowOpacity.feedback.positive};
`

interface IconProps {
  name: string
  danger?: boolean
}

const Icon = styled(FontAwesome).attrs<IconProps>(() => ({
  size: 16,
  color: '#fff',
}))<IconProps>``
