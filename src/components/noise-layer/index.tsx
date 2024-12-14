/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react'
import { Image, StyleSheet } from 'react-native'

interface NoiseLayerProps {
  opacity?: number
}

const NoiseLayer: React.FC<NoiseLayerProps> = ({ opacity = 0.1 }) => (
  <Image
    source={require('@assets/noise.png')}
    style={[styles.noiseImage, { opacity }]}
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

export default NoiseLayer
