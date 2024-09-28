import React from 'react';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';

interface GradientBackgroundProps {
  expanded: boolean;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  expanded,
}) => {
  return (
    <Svg
      height="100%"
      width="100%"
      key={expanded ? 'expanded' : 'collapsed'}
      style={{ position: 'absolute', borderRadius: 10 }}>
      <Defs>
        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="white" stopOpacity="0" />
          <Stop offset="100%" stopColor="white" stopOpacity=".1" />
        </LinearGradient>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#grad)" />
    </Svg>
  );
};

export default GradientBackground;
