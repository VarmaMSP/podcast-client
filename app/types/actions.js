// @flow
import type {Podcast, Episode} from './podcast';

export type PodcastAction = SelectPodcastAction
export type NowPlayingAction = SelectEpisodeAction
export type SubscriptionsAction = SubscribeAction | UnsubscribeAction

export type SelectPodcastAction = {|
  type: string,
  podcast: Podcast
|};

export type SelectEpisodeAction = {|
  type: string,
  data: {
    episode: Episode,
    podcast: Podcast
  }
|};

export type SubscribeAction = {|
  type: string,
  podcast: Podcast
|};

export type UnsubscribeAction = {|
  type: string,
  id: number
|};
