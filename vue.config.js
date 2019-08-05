const webpack = require('webpack')

module.exports = {
  baseUrl: '/huge-rock-demo/dist/',
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  css: undefined,
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/cptable/)
    ],
    node: {
      fs: "empty"
    },
    externals: [
      {  "./cptable": "var cptable",  "./jszip": "jszip" }
    ]
  }
}