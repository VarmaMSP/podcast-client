// @flow
import type {Podcast, Episode} from '../types/podcast';
import type {PodcastAction, NowPlayingAction, SubscriptionsAction} from '../types/actions';
import {combineReducers} from 'redux';

const podcastReducer = (state: ?Podcast = null, action: PodcastAction): ?Podcast => {
  switch(action.type) {
    case 'SELECT_PODCAST':
      return action.podcast;
    default:
      return state;
  }
};

type NowPlayingState = {
  episode: Episode,
  podcast: Podcast
};

const nowPlayingReducer = (state: ?NowPlayingState = null, action: NowPlayingAction): ?NowPlayingState => {
  switch(action.type) {
    case 'SELECT_EPISODE':
      return action.data;
    default:
      return state;
  }
};

const subscriptionsReducer = (state: Array<Podcast> = [], action: SubscriptionsAction): Array<Podcast> => {
  switch(action.type) {
    case 'SUBSCRIBE_PODCAST':
      return state.concat(action.podcast);
    case 'UNSUBSCRIBE_PODCAST':
      for (let i = 0; i < state.length; ++i) {
        if (state[i].id === action.id) {
          let l = state.slice(0, i),
              r = state.slice(i + 1);
          return l.concat(r);
        }
      }
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  podcast: podcastReducer,
  nowPlaying: nowPlayingReducer,
  subscriptions: subscriptionsReducer
});
