const webpack = require('webpack');

module.exports = function override (config, env) {
  console.log('override')
  let loaders = config.resolve
  loaders.fallback = {
      "os": require.resolve("os-browserify/browser"),
      "fs": false,
      "tls": false,
      "net": false,
      "http": require.resolve("stream-http"),
      "https": false,
      "zlib": require.resolve("browserify-zlib") ,
      "path": require.resolve("path-browserify"),
      "stream": require.resolve("stream-browserify"),
      "util": false,
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer"),
      "Buffer": require.resolve("buffer"),
      "process": require.resolve('process/browser'),

  }

  if (!config.plugins) {
    config.plugins = [];
  }
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.MY_ENV': JSON.stringify(process.env.MY_ENV),
    }),
  );
  
  return config
}