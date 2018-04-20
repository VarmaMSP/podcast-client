// @flow
import type {Podcast, Episode} from '../types/podcast';
import type {PodcastAction, NowPlayingAction} from '../types/actions';
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

const nowPlayingReducer = (state: ?NowPlayingState, action: NowPlayingAction): ?NowPlayingState => {
  switch(action.type) {
    case 'SELECT_EPISODE':
      return action.data;
    default:
      return state;
  }
};

export default combineReducers({
  podcast: podcastReducer,
  nowPlaying: nowPlayingReducer
});
