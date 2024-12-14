module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@components': './src/components',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@context': './src/context',
          '@navigation': './src/navigation',
          '@store': './src/store',
          '@config': './src/config',
          '@root': './',
        },
      },
    ],
  ],
}
