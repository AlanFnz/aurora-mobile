/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react'
import { Image, StyleProp, StyleSheet, ImageStyle } from 'react-native'

interface NoiseLayerProps {
  opacity?: number
  customStyle?: StyleProp<ImageStyle>
}

export const NoiseLayer: React.FC<NoiseLayerProps> = ({
  opacity = 0.1,
  customStyle,
}) => (
  <Image
    source={require('@assets/noise-layer.png')}
    style={[styles.noiseImage, customStyle, { opacity }]}
    resizeMode="repeat"
  />
)

const styles = StyleSheet.create({
  noiseImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
})
