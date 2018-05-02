// @flow
import type {Episode, FeedScheme} from '../types/podcast';

import request from 'request';
import FeedParser from 'feedparser';
import {insertFeed, selectFeed} from '../utils/db';

const CACHE_TIME = 15; //30 min

/* Utility function to cache a podcast when subscribed */
export async function cacheFeed(feedUrl: string, podcastId: number) {
  try {
    let episodes = await fetchFeed({url: feedUrl, method: 'GET'});
    await insertFeed({episodes, podcastId, lastModified: (new Date()).toString()});
    return episodes.slice(0, 4);
  } catch(err) {
    throw err;
  }
}

/* Returns the contents of the cache, if time since last modified is greater than CACHE_TIME */
export async function fetchEpisodes(feedUrl: string, podcastId: number, isSubscribed: boolean, onlyNew: boolean = false) {
  try {
    if (!isSubscribed) {
      return await fetchFeed({url: feedUrl, method: 'GET'});
    } else {
      let episodes: Array<Episode> = [];
      let persistedFeed: FeedScheme = await selectFeed(podcastId);
      if (timeElapsed(persistedFeed.lastModified) < CACHE_TIME) {
        episodes = onlyNew ? [] : persistedFeed.episodes;
      } else {
        episodes = await fetchFeed({url: feedUrl, method: 'GET'});
        await insertFeed({episodes, podcastId, lastModified: (new Date()).toString()});
        episodes = onlyNew ? episodes.slice(0, (episodes.length - persistedFeed.episodes.length)) : episodes;
      }
      return episodes;
    }
  } catch(err) {
    throw err;
  }
}

function timeElapsed(dateString: string): number {
  let d = new Date(dateString);
  let D = new Date();
  return Math.floor((D - d) / 60000);
}

/* Function to fetch RSS feed */
type ReqOpts = {|
  url: string,
  method?: string
|};

function fetchFeed(opts: ReqOpts): Promise<Array<Episode>> {
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

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const formatDate = (dateString: string): string => {
  let date = new Date(dateString);
  return date ? `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}` : ''
}
const stripNonUTF8 = (str: string) => str.replace(/[\u0800-\uFFFF]/g, '');
