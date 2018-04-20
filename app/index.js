// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import reducers from './reducers';
import Header from './components/Header';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Header/>
  </Provider>,
  (document.getElementById('app'): any)
);
