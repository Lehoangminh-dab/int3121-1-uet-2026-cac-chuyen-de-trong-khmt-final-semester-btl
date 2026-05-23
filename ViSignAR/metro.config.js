const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

config.resolver.assetExts = [
  ...config.resolver.assetExts.filter((ext) => ext !== 'glb' && ext !== 'gltf' && ext !== 'obj' && ext !== 'mtl' && ext !== 'bin' && ext !== 'hdr'),
  'glb',
  'gltf',
  'obj',
  'mtl',
  'bin',
  'hdr',
]

module.exports = config
