module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@assets': './src/assets',
          '@store': './src/store',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@navigation': './src/navigation',
          '@root': './',
        },
      },
    ],
  ],
};
