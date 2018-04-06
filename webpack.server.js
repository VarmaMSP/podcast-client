const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config')('dev');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const compiler = webpack(webpackConfig);
const staticDir = path.resolve(__dirname, 'docs');
const optionsObj = {publicPath: '/', stats: {colors: true}};

app.use(webpackDevMiddleware(compiler, optionsObj));
app.use('/', express.static(staticDir));

const port = 8080;
app.listen(port, err => {
  if (! err)
    console.log(`Development Server running on localhost:${port}`);
});
