# [Phenopod](http://phenopod.com)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A minimalistic podcast player that allows to search and stream podcasts from your browser.

![alt text](https://raw.githubusercontent.com/VarmaMSP/phenopod-client/master/screenshot.png "Screenshot")

## Tools
This project uses the following open source projects.

* [React JS](http://facebook.github.io/react/index.html)
* [Redux](https://redux.js.org/), [React-redux](https://github.com/reactjs/react-redux)
* [React Router](https://github.com/ReactTraining/react-router)
* [SASS](http://sass-lang.com/)
* [Request](https://github.com/request/request)
* [Node-feedparser](https://github.com/danmactough/node-feedparser)

## Installation
Install yarn globally before setup.

```sh
git clone https://github.com/VarmaMSP/phenopod.git
cd phenopod
yarn setup
yarn build:dev
```
Open your browser at: http://localhost:8081

## Code Style
[![JavaScript Style Guide][standard-image]][standard-url]

This project uses [`standard`][standard-url] to maintain code style and consistency. 
`yarn test` runs `standard` automatically.

[standard-image]: https://cdn.rawgit.com/standard/standard/master/badge.svg
[standard-url]: https://github.com/standard/standard
