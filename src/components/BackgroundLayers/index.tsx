import React from 'react';
import { StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';
import NoiseLayer from '../NoiseLayer';
import colors from '@theme/colors';

interface BackgroundLayersProps {
  testID?: string;
}

const BackgroundLayers: React.FC<BackgroundLayersProps> = ({
  testID = 'background-layers',
}) => {
  return (
    <>
      <Svg
        testID={testID}
        height="100%"
        width="100%"
        style={StyleSheet.absoluteFillObject}>
        <Defs>
          <LinearGradient id="grad" x1="150%" y1="120%" x2="50%" y2="0%">
            <Stop offset="0" stopColor={colors.background.primary} />
            <Stop offset="1" stopColor={colors.background.secondary} />
          </LinearGradient>
        </Defs>
        <Rect width="100%" height="100%" fill="url(#grad)" />
      </Svg>

      <BlurView
        style={styles.blurView}
        blurType="dark"
        blurAmount={10}
        reducedTransparencyFallbackColor="black"
      />

      <NoiseLayer opacity={0.05} />
    </>
  );
};

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.5,
  },
});

export default BackgroundLayers;
