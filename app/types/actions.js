// @flow
import type {Podcast, Episode, AudioData} from './podcast';

export type PodcastAction = SelectPodcastAction;
export type NowPlayingAction = SelectEpisodeAction;
export type SubscriptionsAction = SubscribeAction | UnsubscribeAction;
export type UserFeedAction = UpdateUserFeedAction | TruncateUserFeedAction;
export type AddingNewSubscriptionAction = BeginAddingNewSubscriptionAction | CompleteAddingNewSubscriptionAction;
export type FeedNotificationAction = ShowFeedNotificationAction | HideFeedNotificationAction;

export type SelectPodcastAction = {|
  type: 'SELECT_PODCAST',
  podcast: Podcast
|};

export type SelectEpisodeAction = {|
  type: 'SELECT_EPISODE',
  data: AudioData
|};

export type SubscribeAction = {|
  type: 'SUBSCRIBE_PODCAST',
  podcast: Podcast
|};

export type UnsubscribeAction = {|
  type: 'UNSUBSCRIBE_PODCAST',
  id: number
|};

export type UpdateUserFeedAction = {|
  type: 'UPDATE_USER_FEED',
  items: Array<AudioData>
|};

export type TruncateUserFeedAction = {|
  type: 'TRUNCATE_USER_FEED',
  id: number
|};

export type BeginAddingNewSubscriptionAction = {|
  type: 'BEGIN_ADDING_NEW_SUBSCRIPTION'
|};

export type CompleteAddingNewSubscriptionAction = {|
  type: 'COMPLETE_ADDING_NEW_SUBSCRIPTION'
|};

export type ShowFeedNotificationAction = {|
  type: 'SHOW_FEED_NOTIFICATION'
|};

export type HideFeedNotificationAction = {|
  type: 'HIDE_FEED_NOTIFICATION'
|};
