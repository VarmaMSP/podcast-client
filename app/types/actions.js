// @flow
import type {Podcast, Episode} from './podcast';

export type PodcastAction = SelectPodcastAction
export type NowPlayingAction = SelectEpisodeAction
export type SubscriptionsAction = SubscribeAction | UnsubscribeAction

export type SelectPodcastAction = {|
  type: 'SELECT_PODCAST',
  podcast: Podcast
|};

export type SelectEpisodeAction = {|
  type: 'SELECT_EPISODE',
  data: {
    episode: Episode,
    podcast: Podcast
  }
|};

export type SubscribeAction = {|
  type: 'SUBSCRIBE_PODCAST',
  podcast: Podcast
|};

export type UnsubscribeAction = {|
  type: 'UNSUBSCRIBE_PODCAST',
  id: number
|};
