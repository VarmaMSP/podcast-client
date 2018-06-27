// @flow
import type {Podcast, AudioData} from '../types/podcast'
import type {
  PodcastAction,
  NowPlayingAction,
  SubscriptionsAction,
  UserFeedAction,
  AddingNewSubscriptionAction,
  FeedNotificationAction
} from '../types/actions'
import {combineReducers} from 'redux'

/* PODCAST REDUCER */
const podcastReducer = (state: ?Podcast = null, action: PodcastAction): ?Podcast => {
  switch (action.type) {
    case 'SELECT_PODCAST':
      return action.podcast
    default:
      return state
  }
}

/* NOW PLAYING REDUCER */
const nowPlayingReducer = (state: ?AudioData = null, action: NowPlayingAction): ?AudioData => {
  switch (action.type) {
    case 'SELECT_EPISODE':
      return action.data
    default:
      return state
  }
}

/* SUBSCRIPTIONS REDUCER */
const subscriptionsReducer = (state: Array<Podcast> = [], action: SubscriptionsAction): Array<Podcast> => {
  switch (action.type) {
    case 'SUBSCRIBE_PODCAST':
      return [action.podcast, ...state]
    case 'UNSUBSCRIBE_PODCAST':
      for (let i = 0; i < state.length; ++i) {
        if (state[i].id === action.id) { return state.slice(0, i).concat(state.slice(i + 1)) }
      }
      return state
    default:
      return state
  }
}

/* USER FEED REDUCER */
const userFeedReducer = (state: Array<AudioData> = [], action: UserFeedAction): Array<AudioData> => {
  switch (action.type) {
    case 'UPDATE_USER_FEED':
      return [...action.items, ...state]
    case 'TRUNCATE_USER_FEED':
      let unsubscribedPodcastId = action.id
      return state.filter(a => (a.podcast.id !== unsubscribedPodcastId))
    default:
      return state
  }
}

/* ADDING NEW SUBSCRIPTION REDUCER */
const addingNewSubscriptionReducer = (state: boolean = false, action: AddingNewSubscriptionAction): boolean => {
  switch (action.type) {
    case 'BEGIN_ADDING_NEW_SUBSCRIPTION':
      return true
    case 'COMPLETE_ADDING_NEW_SUBSCRIPTION':
      return false
    default:
      return state
  }
}

/* FEED NOTIFICATION */
const feedNotificationReducer = (state: boolean = false, action: FeedNotificationAction): boolean => {
  switch (action.type) {
    case 'SHOW_FEED_NOTIFICATION':
      return true
    case 'HIDE_FEED_NOTIFICATION':
      return false
    default:
      return state
  }
}

export default combineReducers({
  podcast: podcastReducer,
  nowPlaying: nowPlayingReducer,
  subscriptions: subscriptionsReducer,
  addingNewSubscription: addingNewSubscriptionReducer,
  userFeed: userFeedReducer,
  feedNotification: feedNotificationReducer
})
