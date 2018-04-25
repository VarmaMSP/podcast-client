// @flow
import type {Podcast} from '../types/podcast';

import request from 'request';

export default function fetchPodcasts(term: string, limit: number): Promise<Array<Podcast>> {
  let itunesAPI = encodeURI(`https://itunes.apple.com/search?entity=podcast&&limit=${limit}&&term=${term}`);
  return new Promise((resolve, reject) => {
    request(itunesAPI, (err, response, body) => {
      if (err) return reject();
      try {
        let { results } = JSON.parse(body);
        let podcasts: Array<Podcast> = results.map(p => ({
          id       : p.collectionId,
          title    : p.collectionName,
          artist   : p.artistName,
          imageUrl : p.artworkUrl100.replace(/\/[^\/]*$/, ''),
          feedUrl  : p.feedUrl
        }));
        podcasts.length > 0
          ? resolve(podcasts)
          : reject();
      } catch(err) {
        reject();
      }
    });
  });
}
