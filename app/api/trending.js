// @flow
import type {Podcast} from '../types/podcast'
import request from 'request'

export default function getTrending (): Promise<Array<Podcast>> {
  let getUrl = window.location
  let baseUrl = getUrl.protocol + '//' + getUrl.host + '/' + getUrl.pathname.split('/')[1]
  return new Promise((resolve, reject) => {
    request(baseUrl + '/json/trending.json', (err, response, body) => {
      if (err) return reject(err)
      resolve(JSON.parse(body))
    })
  })
}
