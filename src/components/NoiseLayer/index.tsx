import React from 'react';
import { Image, StyleSheet } from 'react-native';

const NoiseLayer: React.FC = () => (
  <Image
    source={require('@assets/noise.png')}
    style={[styles.noiseImage, { opacity: 0.05 }]}
    resizeMode="repeat"
  />
);

const styles = StyleSheet.create({
  noiseImage: {
    width: '100%',
    height: '100%',
    opacity: 0.08,
    position: 'absolute',
  },
});

export default NoiseLayer;
