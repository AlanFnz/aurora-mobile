import React from 'react';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';

const GradientBackground: React.FC = () => {
  return (
    <Svg
      height="100%"
      width="100%"
      style={{ position: 'absolute', borderRadius: 10 }}>
      <Defs>
        <LinearGradient id="grad" x1="20%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="white" stopOpacity="0.02" />
          <Stop offset="100%" stopColor="white" stopOpacity=".11" />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#grad)" />
    </Svg>
  );
};

export default GradientBackground;
