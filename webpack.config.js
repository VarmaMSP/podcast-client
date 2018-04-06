const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const basePath = __dirname;
const outputDir = path.resolve(basePath, 'docs');

//JSX WEBPACK CONFIG
const jsConfig = env => ({
  entry: path.resolve(basePath, 'app', 'index.js'),
  output: {
    path: env === 'dev' ? '/' : path.resolve(outputDir, 'js'),
    publicPath: '/js/',
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(basePath, 'app'),
        options: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(basePath, 'app'),
      path.resolve(basePath, 'node_modules')
    ]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
});

//SCSS WEBPACK CONFIG
const scssConfig = env => ({
  entry: path.resolve(basePath, 'app', 'index.scss'),
  output: {
    path: env === 'dev' ? '/' : path.resolve(outputDir, 'css'),
    publicPath: '/css/',
    filename: 'index.css'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: path.resolve(basePath, 'app'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      allChunks: false,
      filename: 'index.css'
    })
  ]
});

module.exports = env => [jsConfig(env), scssConfig(env)];
