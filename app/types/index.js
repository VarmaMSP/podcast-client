// @flow
import type {Store as ReduxStore, Dispatch as ReduxDispatch} from 'redux';
import type {Podcast, Episode} from './podcast';
import type {SelectPodcastAction, SelectEpisodeAction} from './actions';

export type State = {|
  podcast: ?Podcast,
  nowPlaying: ?{
    podcast: Podcast,
    episode: Episode
  }
|};

export type Action = SelectPodcastAction
                   | SelectEpisodeAction

export type Store    = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;
