// @flow
import type {Dispatch, Store} from '../types/index'
import type {Episode, Podcast, FeedScheme, AudioData} from '../types/podcast'

import request from 'request'
import FeedParser from 'feedparser'
import {insertFeed, selectFeed} from '../utils/db'
import {updateUserFeed, showFeedNotification} from '../actions/index'
import {stripNonUTF8, timeElapsed, getEpisodesAfter, returnAfter} from '../utils/utils'

const CACHE_TIME = 15 // 15 min

/** Refresh user feed (subscriptions) **/
export function refreshUserFeed (store: Store) {
  return async () => {
    console.log('Feed Refresh: ', (new Date()).toLocaleString())
    let dispatch: Dispatch = store.dispatch
    let latestFeed: Array<AudioData> = []
    let subscriptions: Array<Podcast> = store.getState().subscriptions
    for (let i = 0; i < subscriptions.length; ++i) {
      let sub = subscriptions[i]
      try {
        let cachedFeed = await selectFeed(sub.id)
        if (timeElapsed(cachedFeed.lastModified) >= CACHE_TIME) {
          let episodes = await getEpisodes({url: sub.feedUrl, method: 'GET'})
          await insertFeed({episodes, podcastId: sub.id, lastModified: (new Date()).toString()})
          getEpisodesAfter(cachedFeed.episodes[0].date, episodes).forEach(episode => latestFeed.push({podcast: sub, episode}))
        }
      } catch (err) {
        let feed = store.getState().userFeed
        let episodes = await getEpisodes({url: sub.feedUrl, method: 'GET'})
        await insertFeed({episodes, podcastId: sub.id, lastModified: (new Date()).toString()})
        getEpisodesAfter(feed[0].episode.date, episodes).forEach(episode => latestFeed.push({podcast: sub, episode}))
      }
    }
    if (latestFeed.length > 0) {
      dispatch(updateUserFeed(latestFeed))
      dispatch(showFeedNotification())
    }
  }
}

/** Fetch podcast feed (return cache if it's expired) **/
export async function fetchFeed (podcast: Podcast) {
  try {
    let cache: FeedScheme = await selectFeed(podcast.id)
    let isCacheExpired: boolean = !cache || timeElapsed(cache.lastModified) >= CACHE_TIME
    return isCacheExpired
      ? await getEpisodes({url: podcast.feedUrl, method: 'GET'})
      : await returnAfter(400, cache.episodes)
  } catch (err) {
    console.log(err)
    throw err
  }
}

/** Fetch episodes from a RSS feed **/
export function getEpisodes (opts: {| url: string, method?: string |}): Promise<Array<Episode>> {
  return new Promise((resolve, reject) => {
    try {
      opts.url = 'http://cors-anywhere.herokuapp.com/' + opts.url
      let req = request(opts)
      req
        .on('error', reject)
        .on('response', res => {
          let contentType = res.headers['content-type'].split(';')[0]
          if (contentType === 'text/html') {
            let data = ''
            req.on('data', d => { data += d })
            req.on('end', () => resolve(parseHTML(data)))
          } else {
            parseXML(req, (error, episodes) => {
              if (error) return reject(error)
              resolve(episodes)
            })
          }
        })
    } catch (err) {
      reject(err)
    }
  })
}

function parseXML (stream, callback: (mixed, Array<Episode>) => any) {
  let episodes: Array<Episode> = []
  let parser = new FeedParser()
  parser.on('end', () => callback(null, episodes))
  parser.on('error', () => callback(new Error('error'), []))
  parser.on('readable', () => {
    let item
    while ((item = parser.read())) {
      try {
        episodes.push({
          title: stripNonUTF8(item.title),
          description: stripNonUTF8(item.description),
          date: item.date,
          link: item.enclosures[0].url,
          fileType: item.enclosures[0].type
        })
      } catch (e) {
        continue
      }
    }
  })
  stream.pipe(parser)
}

function parseHTML (data): Array<Episode> {
  let episodes: Array<Episode> = []
  let elem = document.createElement('html'); elem.innerHTML = data
  let nodes = elem.querySelectorAll('li.regularitem')
  for (let i = 0; i < nodes.length; ++i) {
    let e = nodes[i].querySelector('.itemposttime')
    if (e && e.firstChild) e.removeChild(e.firstChild)
  }
  for (let i = 0; i < nodes.length; ++i) {
    try {
      episodes.push({
        title: nodes[i].querySelector('.itemtitle a').innerHTML,
        description: nodes[i].querySelector('.itemcontent').innerHTML,
        date: nodes[i].querySelector('.itemposttime').innerHTML,
        link: nodes[i].querySelector('.podcastmediaenclosure a').getAttribute('href'),
        fileType: 'audio/mpeg'
      })
    } catch (e) {
      continue
    }
  }
  elem.remove()
  return episodes
}
