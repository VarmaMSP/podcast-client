// @flow
import type {Podcast, Episode, AudioData} from '../types/podcast';
import type {
  SelectPodcastAction,
  SelectEpisodeAction,
  SubscribeAction,
  UnsubscribeAction,
  UpdateUserFeedAction,
  TruncateUserFeedAction,
  BeginAddingNewSubscriptionAction,
  CompleteAddingNewSubscriptionAction,
  ShowFeedNotificationAction,
  HideFeedNotificationAction
} from '../types/actions';

export const selectPodcast = (podcast: Podcast): SelectPodcastAction => ({
  type: 'SELECT_PODCAST',
  podcast
});

export const selectEpisode = (podcast: Podcast, episode: Episode): SelectEpisodeAction => ({
  type: 'SELECT_EPISODE',
  data: { podcast, episode }
});

export const subscribe = (podcast: Podcast): SubscribeAction => ({
  type: 'SUBSCRIBE_PODCAST',
  podcast
});

export const unsubscribe = (podcast: Podcast): UnsubscribeAction => ({
  type: 'UNSUBSCRIBE_PODCAST',
  id: podcast.id
});

export const updateUserFeed = (items: Array<AudioData>): UpdateUserFeedAction => ({
  type: 'UPDATE_USER_FEED',
  items
});

export const truncateUserFeed = (podcast: Podcast): TruncateUserFeedAction => ({
  type: 'TRUNCATE_USER_FEED',
  id: podcast.id
});

export const beginAddingNewSubscrition = (): BeginAddingNewSubscriptionAction => ({
  type: 'BEGIN_ADDING_NEW_SUBSCRIPTION'
});

export const completeAddingNewSubscription = (): CompleteAddingNewSubscriptionAction => ({
  type: 'COMPLETE_ADDING_NEW_SUBSCRIPTION'
});

export const showFeedNotification = (): ShowFeedNotificationAction => ({
  type: 'SHOW_FEED_NOTIFICATION'
});

export const hideFeedNotification = (): HideFeedNotificationAction => ({
  type: 'HIDE_FEED_NOTIFICATION'
});
