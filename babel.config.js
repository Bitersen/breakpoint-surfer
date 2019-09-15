module.exports = function (api) {
  const isProd = api.env('production')
  const isDev = api.env('development')
  const isTest = api.env('test')
  let presets = []
  // let plugins = []

  if (isDev || isTest) {
    presets = ['@babel/preset-env']
  }

  if (isProd) {
    presets = ['@babel/preset-env', 'minify']
  }

  return {
    presets,
    // plugins
  }
}
