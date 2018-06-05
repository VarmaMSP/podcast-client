// @flow
import type {Dispatch} from '../types/index'
import type {Podcast} from '../types/podcast'

import {getEpisodes} from '../api/rssFeed'
import {insertFeed, deleteFeed} from '../utils/db'
import {
  subscribe,
  unsubscribe,
  updateUserFeed,
  truncateUserFeed,
  beginAddingNewSubscrition,
  completeAddingNewSubscription
} from './index'

export const subscribeToPodcast = (podcast: Podcast) => (dispatch: Dispatch) => {
  dispatch(beginAddingNewSubscrition())
  getEpisodes({url: podcast.feedUrl, method: 'GET'})
    .then(episodes => {
      dispatch(updateUserFeed(episodes.slice(0, 2).map(e => ({episode: e, podcast}))))
      return insertFeed({episodes, podcastId: podcast.id, lastModified: (new Date()).toString()})
    })
    .then(() => {
      dispatch(subscribe(podcast))
      dispatch(completeAddingNewSubscription())
    })
    .catch(console.log)
}

export const unsubscribePodcast = (podcast: Podcast) => (dispatch: Dispatch) => {
  deleteFeed(podcast.id)
    .then(() => {
      dispatch(truncateUserFeed(podcast))
      dispatch(unsubscribe(podcast))
    })
    .catch(console.log)
}
