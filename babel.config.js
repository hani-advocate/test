const MODULE_RESOLVER = [
  'module-resolver',
  {
    extensions: ['.js', '.ios.js', '.android.js', '.json'],
    alias: {
      '@root': './src/',
      '@theme': './src/Theme/',
      '@screens': './src/Screens/',
      '@constants': './src/Constants/',
      '@components': './src/Components/',
      '@assets': './src/Assets/',
      '@svg': './src/Assets/SVG/',
      '@utils': './src/Utils/',
      '@api': './src/APIs/',
      '@types': './src/ActionsTypes/',
      '@actions': './src/Actions/',
      '@hooks': './src/Hooks/',
      '@advanced': './src/AdvancedComponents/',
    },
  },
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    MODULE_RESOLVER,
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
