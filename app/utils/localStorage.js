// @flow
import type {State} from '../types/index';

export const loadState = (): State => {
  try {
    let subscriptions = localStorage.getItem('subscriptions');
    return {
      nowPlaying: undefined,
      podcast: undefined,
      subscriptions: subscriptions ? JSON.parse(subscriptions) : []
    };
  } catch (err) {
    return {
      nowPlaying: undefined,
      podcast: undefined,
      subscriptions: []
    };
  }
};

export const saveState = (state: State) => {
  try {
    let subscriptions = JSON.stringify(state.subscriptions);
    localStorage.setItem('subscriptions', subscriptions);
  } catch (err) {
    console.log(err);
  }
};
