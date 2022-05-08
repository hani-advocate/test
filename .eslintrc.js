module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'react-native/no-inline-styles': 0,
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        alias: {
          '@root': './src',
          '@theme': './src/Theme',
          '@screens': './src/Screens',
          '@constants': './src/Constants',
          '@components': './src/Components',
          '@assets': './src/Assets',
          '@svg': './src/Assets/SVG',
          '@utils': './src/Utils',
          '@api': './src/APIs',
          '@types': './src/ActionsTypes',
          '@actions': './src/Actions',
          '@hooks': './src/Hooks',
          '@advanced': './src/AdvancedComponents',
        },
      },
    },
  },
};
