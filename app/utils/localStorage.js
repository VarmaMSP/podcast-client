// @flow
import type {State} from '../types/index';

export const loadState = (): State => {
  try {
    let userFeed = localStorage.getItem('user-feed');
    let subscriptions = localStorage.getItem('subscriptions');
    return {
      nowPlaying: undefined,
      podcast: undefined,
      subscriptions: subscriptions ? JSON.parse(subscriptions) : [],
      userFeed: userFeed ? JSON.parse(userFeed) : []
    };
  } catch (err) {
    return {
      nowPlaying: undefined,
      podcast: undefined,
      subscriptions: [],
      userFeed: []
    };
  }
};

export const saveState = (state: State) => {
  try {
    let userFeed = JSON.stringify(state.userFeed);
    let subscriptions = JSON.stringify(state.subscriptions);
    localStorage.setItem('user-feed', userFeed);
    localStorage.setItem('subscriptions', subscriptions);
  } catch (err) {
    console.log(err);
  }
};
