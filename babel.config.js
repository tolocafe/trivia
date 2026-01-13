// oxlint-disable func-names
// oxlint-disable no-undef
// oxlint-disable no-anonymous-default-export
module.exports = function (api) {
  api.cache(true)
  return {
    plugins: [
      '@lingui/babel-plugin-lingui-macro',
      [
        'react-native-unistyles/plugin',
        {
          root: `${__dirname}/src`,
        },
      ],
    ],
    presets: ['babel-preset-expo'],
  }
}
