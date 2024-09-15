module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@store': './src/store',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
