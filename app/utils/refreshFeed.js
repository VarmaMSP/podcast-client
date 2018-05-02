// @flow
import type {Store, State} from '../types/index';

import {updateUserFeed} from '../actions/index';
import {fetchEpisodes} from '../api/rssFeed';

export default function refreshFeed(store: Store) {
  return () => {
    console.log('Refresh Started at ', (new Date).toString());
    let state: State = store.getState();
    let {subscriptions} = state;
    for (let i = 0; i < subscriptions.length; ++i) {
      let id = subscriptions[i].id;
      let feedUrl = subscriptions[i].feedUrl;
      fetchEpisodes(feedUrl, id, true, true)
        .then(episodes => episodes.length > 0
          ? Promise.resolve(episodes.map(e => ({
            podcast: subscriptions[i],
            episode: e
          })))
          : Promise.reject()
        )
        .then(newFeed => {
          newFeed.forEach(({episode}) => console.log('     ', episode.title));
          store.dispatch(updateUserFeed(newFeed))
        }, () => {});
    }
  };
}
