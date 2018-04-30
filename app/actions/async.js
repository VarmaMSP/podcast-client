// @flow
import type {Dispatch} from '../types/index';
import type {Podcast} from '../types/podcast';

import fetchEpisodes from '../api/rssFeed';
import {deleteFeed} from '../utils/db';
import {
  subscribe,
  unsubscribe,
  updateUserFeed,
  truncateUserFeed,
  beginAddingNewSubscrition,
  completeAddingNewSubscription
} from './index';

export const subscribeToPodcast = (podcast: Podcast) => (dispatch: Dispatch) => {
  dispatch(beginAddingNewSubscrition());
  fetchEpisodes(podcast.feedUrl, podcast.id, true, true)
    .then(episodes => {
      let items = episodes.map(e => ({podcast, episode: e}));
      dispatch(updateUserFeed(items));
      dispatch(subscribe(podcast));
      dispatch(completeAddingNewSubscription());
    }, console.log);
};

export const unsubscribePodcast = (podcast: Podcast) => (dispatch: Dispatch) => {
  deleteFeed(podcast.id)
    .then(() => {
      dispatch(truncateUserFeed(podcast));
      dispatch(unsubscribe(podcast));
    }, console.log);
};
