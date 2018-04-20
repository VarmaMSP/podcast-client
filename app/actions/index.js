// @flow
import type {Podcast, Episode} from '../types/podcast';
import type {SelectPodcastAction, SelectEpisodeAction} from '../types/actions';

export const selectPodcast = (podcast: Podcast): SelectPodcastAction => ({
  type: 'SELECT_PODCAST',
  podcast
});

export const selectEpisode = (podcast: Podcast, episode: Episode): SelectEpisodeAction => ({
  type: 'SELECT_EPISODE',
  data: { podcast, episode }
});
