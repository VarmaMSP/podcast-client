// @flow
import type {Store, State} from './types/index';

import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import reducers from './reducers';
import Header from './components/Header';
import Footer from './components/Footer';
import Feed from './components/Feed';
import Podcast from './components/Podcast';
import SearchResults from './components/SearchResults';
import Subscriptions from './components/Subscriptions';
import {loadState, saveState} from './utils/localStorage';
import refreshFeed from './utils/refreshFeed';


const prevState: State = loadState();
const store: Store = createStore(reducers, prevState, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Header/>
        <div className='main-content container'>
          <Switch>
            <Route exact path='/podcast' component={Podcast}/>
            <Route exact path='/subscriptions' component={Subscriptions}/>
            <Route exact path='/feed' component={Feed}/>
            <Route exact path='/search/:term' component={SearchResults}/>
            <Redirect to='/feed'/>
          </Switch>
        </div>
        <input type='checkbox' style={{display: 'none'}} id='footer-state'/>
        <Footer/>
      </div>
    </Router>
  </Provider>,
  (document.getElementById('app'): any)
);

store.subscribe(() => saveState(store.getState()));

refreshFeed(store)();
setInterval(refreshFeed(store), 900000);
