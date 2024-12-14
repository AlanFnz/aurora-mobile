import colors from '@theme/colors'
import React from 'react'
import styled from 'styled-components/native'

interface DividerProps {
  color?: string
  opacity?: number
  height?: number
  marginHorizontal?: number
  marginVertical?: number
  testID?: string
}

const Divider: React.FC<DividerProps> = ({
  color = colors.common.lightGray,
  opacity = 1,
  height = 1,
  marginHorizontal = 0,
  marginVertical = 8,
  testID = 'divider',
}) => {
  return (
    <DividerLine
      testID={testID}
      color={color}
      opacity={opacity}
      height={height}
      marginHorizontal={marginHorizontal}
      marginVertical={marginVertical}
    />
  )
}

const DividerLine = styled.View<DividerProps>`
  height: ${({ height }) => height}px;
  opacity: ${({ opacity }) => opacity};
  background-color: ${({ color }) => color};
  margin: ${({ marginVertical }) => marginVertical}px
    ${({ marginHorizontal }) => marginHorizontal}px;
`

export default Divider
