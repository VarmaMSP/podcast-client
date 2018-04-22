// @flow
import type {Store, State} from './types/index';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducers from './reducers';
import Header from './components/Header';
import Footer from './components/Footer';
import Podcast from './components/Podcast';

const initState: State = {
  podcast: {
    title: "Waking Up with Sam Harris",
    artist: "Sam Harris",
    imageUrl: "https://is3-ssl.mzstatic.com/image/thumb/Music128/v4/4f/df/51/4fdf5122-5b7d-1fa2-b04e-9ff6317aff27/source",
    feedUrl: "http://wakingup.libsyn.com/rss"
  },
  nowPlaying: {
    podcast: {
      title: "Waking Up with Sam Harris",
      artist: "Sam Harris",
      imageUrl: "https://is3-ssl.mzstatic.com/image/thumb/Music128/v4/4f/df/51/4fdf5122-5b7d-1fa2-b04e-9ff6317aff27/source",
      feedUrl: "http://wakingup.libsyn.com/rss"
    },
    episode: {
      title: "#123  Identity & Honesty",
      date: "9 April, 2018",
      link: "http://traffic.libsyn.com/wakingup/Waking_Up_123_Klein.mp3?dest-id=480596",
      fileType: "audio/mpeg"
    }
  }
}

const store: Store = createStore(reducers, initState);

ReactDOM.render(
  <Provider store={store}>
    <div>
      {/* HEADER */}
      <Header/>
      {/* MAIN CONTENT*/}
      <div className='main-content container'>
        <Podcast/>
      </div>
      {/* FOOTER */}
      <input type='checkbox' style={{display: 'none'}} id='footer-state'/>
      <Footer/>
    </div>
  </Provider>,
  (document.getElementById('app'): any)
);
