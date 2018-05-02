// @flow
import type {Dispatch} from '../types/index';
import type {Podcast} from '../types/podcast';

import {cacheFeed} from '../api/rssFeed';
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
  cacheFeed(podcast.feedUrl, podcast.id)
    .then(episodes => {
      dispatch(updateUserFeed(episodes.map(e => ({podcast, episode: e}))));
      dispatch(subscribe(podcast));
      dispatch(completeAddingNewSubscription());
    }, (err) => {
      dispatch(completeAddingNewSubscription());
    });
};

export const unsubscribePodcast = (podcast: Podcast) => (dispatch: Dispatch) => {
  deleteFeed(podcast.id)
    .then(() => {
      dispatch(truncateUserFeed(podcast));
      dispatch(unsubscribe(podcast));
    }, console.log);
};
