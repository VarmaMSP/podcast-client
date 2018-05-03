// @flow
import type {Dispatch, Store} from '../types/index';
import type {Episode, Podcast, FeedScheme} from '../types/podcast';

import request from 'request';
import FeedParser from 'feedparser';
import {insertFeed, selectFeed} from '../utils/db';
import {updateUserFeed} from '../actions/index';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const CACHE_TIME = 15; //30 min

/*** Refresh user feed (subscriptions) ***/
export function refreshUserFeed(store: Store) {
  return async () => {
    console.log('Feed Refresh: ', (new Date()).toLocaleString());
    let dispatch      = store.dispatch;
    let subscriptions = store.getState().subscriptions;
    try {
      let persistedFeeds = await Promise.all(subscriptions.map(p => selectFeed(p.id)));
      for (let i = 0; i < persistedFeeds.length; ++i) {
        let cache: FeedScheme = persistedFeeds[i];
        if (timeElapsed(cache.lastModified) >= CACHE_TIME) {
          /* cache expired */
          let episodes   = await getEpisodes({url: subscriptions[i].feedUrl, method: 'GET'});
          let latestFeed = episodes.slice(0, episodes.length - cache.episodes.length).map(episode => ({podcast: subscriptions[i], episode}));
          await insertFeed({episodes, podcastId: subscriptions[i].id, lastModified: (new Date()).toString()});
          if (latestFeed.length > 0) dispatch(updateUserFeed(latestFeed));
        }
      }
    } catch(err) {
      throw err;
    }
  }
}

/*** Fetch podcast feed (return cache if it's expired) ***/
export async function fetchFeed(podcast: Podcast) {
  try {
    let cache: FeedScheme = await selectFeed(podcast.id);
    let isCacheExpired: boolean = !cache || timeElapsed(cache.lastModified) >= CACHE_TIME;
    return isCacheExpired ? await getEpisodes({url: podcast.feedUrl, method: 'GET'}) : cache.episodes;
  } catch(err) {
    console.log(err);
    throw err;
  }
}

/*** Fetch episodes from a RSS feed ***/
export function getEpisodes(opts: {| url: string, method?: string |}): Promise<Array<Episode>> {
  return new Promise((resolve, reject) => {
    try {
      opts.url += (new URL(opts.url)).hostname === 'feeds.feedburner.com' ? '?format=xml' : '';
      opts.url = 'http://cors-anywhere.herokuapp.com/' + opts.url;

      let episodes: Array<Episode> = [];
      let parser = new FeedParser();

      request(opts)
        .on('error', reject)
        .pipe(parser);
      parser
        .on('readable', () => {
          let item;
          while(item = parser.read()) {
            try {
              let episode: Episode = {
                title       : stripNonUTF8(item.title),
                description : stripNonUTF8(item.description),
                date        : formatDate(item.date),
                link        : item.enclosures[0].url,
                fileType    : item.enclosures[0].type,
              };
              episodes.push(episode);
            } catch(e) {
              continue;
            }
          }
        })
        .on('end', () => resolve(episodes))
        .on('error', reject);
    } catch(err) {
      reject(err);
    }
  });
}

/**
*** Utility functions
**/
function timeElapsed(dateString: string): number {
  let d = new Date(dateString);
  let D = new Date();
  return Math.floor((D - d) / 60000);
}

function formatDate(dateString: string): string {
  let date = new Date(dateString);
  return date ? `${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}` : '';
}

function stripNonUTF8(str: string) {
  return str.replace(/[\u0800-\uFFFF]/g, '');
}
