// @flow
import type {Store as ReduxStore, Dispatch as ReduxDispatch} from 'redux'
import type {Podcast, AudioData} from './podcast'
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
} from './actions'

export type State = {|
  +podcast: ?Podcast,
  +nowPlaying: ?AudioData,
  +subscriptions: Array<Podcast>,
  +addingNewSubscription: boolean,
  +userFeed: Array<AudioData>,
  +feedNotification: boolean
|}

export type Action = SelectPodcastAction
                   | SelectEpisodeAction
                   | SubscribeAction
                   | UnsubscribeAction
                   | UpdateUserFeedAction
                   | TruncateUserFeedAction
                   | BeginAddingNewSubscriptionAction
                   | CompleteAddingNewSubscriptionAction
                   | ShowFeedNotificationAction
                   | HideFeedNotificationAction

export type Store = ReduxStore<State, Action>
export type Dispatch = ReduxDispatch<Action>
