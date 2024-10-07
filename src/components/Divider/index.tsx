import React from 'react';
import styled from 'styled-components/native';

interface DividerProps {
  color?: string;
  height?: number;
  marginHorizontal?: number;
  marginVertical?: number;
}

const Divider: React.FC<DividerProps> = ({
  color = '#cccccc',
  height = 1,
  marginHorizontal = 0,
  marginVertical = 8,
}) => {
  return (
    <DividerLine
      color={color}
      height={height}
      marginHorizontal={marginHorizontal}
      marginVertical={marginVertical}
    />
  );
};

const DividerLine = styled.View<DividerProps>`
  height: ${({ height }) => height}px;
  background-color: ${({ color }) => color};
  margin: ${({ marginVertical }) => marginVertical}px
    ${({ marginHorizontal }) => marginHorizontal}px;
`;

export default Divider;
