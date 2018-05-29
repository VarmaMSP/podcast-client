const fs = require('fs')
const path = require('path')
const request = require('request')
const cheerio = require('cheerio')

const FILE_PATH = path.resolve(__dirname, 'docs', 'json', 'trending.json')

function getPodcast (term) {
  let itunesAPI = encodeURI(`https://itunes.apple.com/search?entity=podcast&&limit=1&&term=${term}`)
  return new Promise((resolve, reject) => {
    request(itunesAPI, (err, response, body) => {
      if (err) return resolve({})
      try {
        let { results } = JSON.parse(body)
        results.length > 0
          ? resolve({
            id: results[0].collectionId,
            title: results[0].collectionName,
            artist: results[0].artistName,
            imageUrl: results[0].artworkUrl100.replace(/\/[^/]*$/, ''),
            feedUrl: results[0].feedUrl
          })
          : resolve({})
      } catch (err) {
        resolve({})
      }
    })
  })
}

function getTrending () {
  let pad = x => '00'.concat(String(x)).slice(-2)
  let date = new Date(Date.now() - 86400000)
  let itunesChartsURL = `http://www.itunescharts.net/us/charts/podcasts/${date.getFullYear()}/${pad(date.getMonth() + 1)}/${pad(date.getDate())}`
  return new Promise((resolve, reject) => {
    request(itunesChartsURL, (err, response, body) => {
      if (err) return reject(err)
      let $ = cheerio.load(body)
      let res = []
      $('#chart .entry a').each((i, html) => {
        res.push($(html).text())
      })
      resolve(res)
    })
  })
}

async function trendingPodcasts () {
  let trending = await getTrending()
  let podcasts = await Promise.all(trending.map(getPodcast))
  return podcasts.filter(x => Object.keys(x).length > 0)
}

trendingPodcasts()
  .then(res => {
    fs.writeFile(FILE_PATH, JSON.stringify(res, undefined, 2), err => {
      if (err) console.log(err)
    })
    console.log('File saved.')
  })
  .catch(console.log)
