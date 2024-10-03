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
          '@navigation': './src/navigation',
          '@root': './',
        },
      },
    ],
  ],
};
