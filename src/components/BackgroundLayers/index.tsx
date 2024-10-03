import React from 'react';
import { StyleSheet } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { Defs, LinearGradient, Rect, Stop, Svg } from 'react-native-svg';
import NoiseLayer from '../NoiseLayer';

const FROM_COLOR = 'rgb(39,36,37)';
const TO_COLOR = 'rgb(134,50,92)';

const BackgroundLayers: React.FC = () => {
  return (
    <>
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFillObject}>
        <Defs>
          <LinearGradient id="grad" x1="90%" y1="50%" x2="0%" y2="100%">
            <Stop offset="0" stopColor={FROM_COLOR} />
            <Stop offset="1" stopColor={TO_COLOR} />
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

      <NoiseLayer />
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
