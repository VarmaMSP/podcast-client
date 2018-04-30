// @flow
import type {Episode} from '../types/podcast';

import request from 'request';
import FeedParser from 'feedparser';
import {insertFeed, selectFeed} from '../utils/db';

/* Use IndexedDb as a Cache to store RSS Feed */
export default async function fetchEpisodes(feedUrl: string, podcastId: number, cache: boolean = false, onlyNew: boolean = false) {
  let persistedFeed = await selectFeed(podcastId);
  try {
    let { status, lastModified, episodes } = await fetchFeed({
      url: feedUrl,
      method: 'GET',
      headers: persistedFeed ? { 'if-modified-since': persistedFeed.lastModified } : {}
    });
    if (status === 200 && cache)
      await insertFeed({podcastId, lastModified, episodes});
    if (status === 304)
      episodes = persistedFeed.episodes;
    if (onlyNew && persistedFeed) {
      let d = new Date(persistedFeed.lastModified);
      for (let i = 0; i < episodes.length; ++i) {
        if ((new Date(episodes[i].date)) < d)
          return episodes.slice(0, i + 1);
      }
    }
    return onlyNew ? episodes.slice(0, 4) : episodes;
  } catch(err) {
    throw err;
  }
};

/* Function to fetch RSS feed */
type ReqOpts = {|
  url: string,
  method?: string,
  headers?: Object
|};

type Feed = {|
  status: string,
  episodes: Array<Episode>,
  lastModified: string,
|};

function fetchFeed(opts: ReqOpts): Promise<Feed> {
  return new Promise((resolve, reject) => {
    try {
      opts.url += (new URL(opts.url)).hostname === 'feeds.feedburner.com' ? '?format=xml' : '';
      opts.url = 'http://cors-anywhere.herokuapp.com/' + opts.url;

      const parser = new FeedParser();
      const feedReq = request(opts);

      let status: string           = '';
      let lastModified: string     = '';
      let episodes: Array<Episode> = [];

      feedReq
        .on('error', reject)
        .on('response', ({statusCode, headers}) => {
          status       = statusCode;
          lastModified = headers['last-modified'];
        })
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
        .on('end', () => resolve({status, episodes, lastModified}))
        .on('error', () => status === 304 ? resolve({status, lastModified, episodes: []}) : reject());
    } catch(err) {
      reject(err);
    }
  });
}

/* Utility Functions For FetchFeed function */
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

function formatDate(dateString: string): string {
  let date = new Date(dateString);
  return date ? `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}` : ''
}

function stripNonUTF8(str: string): string {
  return str.replace(/[\u0800-\uFFFF]/g, '');
}
