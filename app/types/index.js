// @flow
import type {Store as ReduxStore, Dispatch as ReduxDispatch} from 'redux';
import type {Podcast, Episode} from './podcast';
import type {
  SelectPodcastAction,
  SelectEpisodeAction,
  SubscribeAction,
  UnsubscribeAction
} from './actions';

export type State = {|
  podcast: ?Podcast,
  nowPlaying: ?{
    podcast: Podcast,
    episode: Episode
  }
|};

export type Action = SelectPodcastAction
                   | SelectEpisodeAction
                   | SubscribeAction
                   | UnsubscribeAction

export type Store    = ReduxStore<State, Action>;
export type Dispatch = ReduxDispatch<Action>;
