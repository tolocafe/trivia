// oxlint-disable-next-line no-undef
const { getDefaultConfig } = require('expo/metro-config')

// oxlint-disable-next-line no-undef
const config = getDefaultConfig(__dirname)

const { transformer, resolver } = config

config.transformer = {
	...transformer,
	babelTransformerPath: require.resolve('@lingui/metro-transformer/expo'),
}

config.resolver = {
	...resolver,
	sourceExts: [...resolver.sourceExts, 'po', 'pot'],
}

// oxlint-disable-next-line no-undef
module.exports = config
