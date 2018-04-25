// @flow
import type {Store, State} from './types/index';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import reducers from './reducers';
import Header from './components/Header';
import Footer from './components/Footer';
import Podcast from './components/Podcast';
import SearchResults from './components/SearchResults';
import Subscriptions from './components/Subscriptions';
import {loadState, saveState} from './utils/localStorage';


const prevState: State = loadState();
const store: Store = createStore(reducers, prevState);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Header/>
        <div className='main-content container'>
          <Switch>
            <Route exact path='/podcast' component={Podcast}/>
            <Route exact path='/subscriptions' component={Subscriptions}/>
            <Route exact path='/search/:term' component={SearchResults}/>
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
