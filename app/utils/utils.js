// @flow
import type {Episode} from '../types/podcast'

const MONTHS = [
  'Jan', 'Feb', 'Mar',
  'Apr', 'May', 'June',
  'July', 'Aug', 'Sept',
  'Oct', 'Nov', 'Dec'
]

export function timeElapsed (dateString: string): number {
  let d = new Date(dateString)
  let D = new Date()
  return Math.floor((D - d) / 60000)
}

export function formatDate (dateString: string): string {
  let date = new Date(dateString)
  return date ? `${date.getDate()} ${MONTHS[date.getMonth()]}, ${date.getFullYear()}` : ''
}

export function stripNonUTF8 (str: string) {
  return str.replace(/[\u0800-\uFFFF]/g, '')
}

export function getEpisodesAfter (dateString: string, episodes: Array<Episode>): Array<Episode> {
  let sinceDate = new Date(dateString)
  for (let i = 0; i < episodes.length; ++i) {
    let episodeDate = new Date(episodes[i].date)
    if (episodeDate <= sinceDate) {
      return episodes.slice(0, i)
    }
  }
  return []
}

export function parseQueryString (queryString: string): Object {
  let queryObj = {}
  let queries = queryString.slice(1).split('&')
  for (let i = 0; i < queries.length; ++i) {
    let [key, value] = queries[i].split('=')
    queryObj[key] = decodeURIComponent(value)
  }
  return queryObj
}

export function returnAfter (time: number, x: mixed): Promise<mixed> {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(x), time)
  })
}
