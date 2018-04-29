// @flow
import type {Podcast, Episode, AudioData} from '../types/podcast';
import type {
  SelectPodcastAction,
  SelectEpisodeAction,
  SubscribeAction,
  UnsubscribeAction,
  UpdateUserFeedAction,
  TruncateUserFeedAction
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
