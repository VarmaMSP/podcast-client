// @flow
import type {Episode} from '../types/podcast';

import request from 'request';
import FeedParser from 'feedparser';

type ReqOpts = {|
  url: string,
  method?: string,
  headers?: Object
|};

export default function fetchEpisodes(reqOpts: ReqOpts): Promise<Array<Episode>> {
  reqOpts.url = 'http://cors-anywhere.herokuapp.com/' + reqOpts.url;
  return new Promise((resolve, reject) => {
    let episodes: Array<Episode> = [];
    const parser = new FeedParser(),
          feedReq = request(reqOpts);
    feedReq
      .on('error', reject)
      .pipe(parser);

    parser
      .on('error', reject)
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
      .on('end', () => resolve(episodes));
  })
}

function stripNonUTF8 (str: string): string {
  return str.replace(/[\u0800-\uFFFF]/g, '');
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
export const formatDate = (dateString: string): string => {
  let date = new Date(dateString);
  return date
    ? `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`
    : ''
}
