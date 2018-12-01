/* Можно было конечно использовать только babel, для TS вот это https://babeljs.io/docs/en/babel-preset-typescript
* https://babeljs.io/setup#installation (Node из списка, не Nodemon) */

const { resolve } = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

module.exports = {
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  entry: './src/index.ts',
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'index.js'
  },
  externals: [
    nodeExternals()
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '~': resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      // TODO возможно exclude не нужен (стоит externals)
      { test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    /**
     * Таким образом, мы говорим * nix системам,
     * что интерпретатором нашего файла JavaScript должен быть /usr/bin/env node,
     * который ищет локально установленный исполняемый файл node.
     */
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })
  ]
}
