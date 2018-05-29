// @flow
import type {Podcast, Episode} from '../../types/podcast'
import type {Dispatch, Action} from '../../types/index'

import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchFeed} from '../../api/rssFeed'
import {selectEpisode} from '../../actions/index'
import {formatDate} from '../../utils/utils'

type Props = {|
  isSubscribed: boolean,
  podcast: Podcast,
  playEpisode: (Podcast, Episode) => Action
|};

type State = {|
  loading: boolean,
  error: boolean,
  episodes: Array<Episode>,
  count: number,
  descId: ?number
|};

class Episodes extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      episodes: [],
      count: 10,
      descId: undefined
    }
  }

  componentDidMount () {
    let { podcast } = this.props
    fetchFeed(podcast)
      .then((episodes) => this.setState({
        loading: false,
        episodes
      }))
      .catch(() => this.setState({
        loading: false,
        error: true
      }))
  }

  handleDescToggle (id: number) {
    return (e: SyntheticEvent<HTMLElement>) => { // eslint-disable-line no-undef
      let { descId } = this.state
      this.setState({descId: descId !== id ? id : undefined})
    }
  }

  handleEpisodePlay (podcast: Podcast) {
    return (episode: Episode) => {
      return (e: SyntheticEvent<HTMLElement>) => { // eslint-disable-line no-undef
        let { playEpisode } = this.props
        playEpisode(podcast, episode)
      }
    }
  }

  handleLoadMore (e: SyntheticEvent<HTMLElement>) { // eslint-disable-line no-undef
    let { count } = this.state
    this.setState({ count: count + 10 })
  }

  render () {
    let { podcast } = this.props
    let { episodes, count, loading, error, descId } = this.state
    let onPlay = this.handleEpisodePlay(podcast).bind(this)
    let onLoadMore = this.handleLoadMore.bind(this)
    let onDescToggle = this.handleDescToggle.bind(this)
    return (
      <div className='episodes'>
        { loading
          ? <div className='loader' />
          : error
            ? <div className='error'>Error Fetching Podcasts.</div>
            : <div>
              {episodes.slice(0, count).map(renderEpisode(onPlay, onDescToggle, descId))}
              { count < episodes.length
                ? <div className='load-more' onClick={onLoadMore}> load more episodes. </div>
                : undefined
              }
            </div>
        }
      </div>
    )
  }
}

const renderEpisode = (onPlay, onDescToggle, descId) => (episode: Episode, i: number) => (
  <div className={'episode'} key={i}>
    <img className='play-icon' src='/img/play-circle.png' onClick={onPlay(episode)} />
    <div className='title'>{episode.title}</div>
    <div className='meta'>
      <span className='date'>{formatDate(episode.date)}</span>
      <span className='dot'> • </span>
      <span className='desc-toggle' onClick={onDescToggle(i)}>
        { descId === i ? 'Hide description' : 'Show description' }
      </span>
    </div>
    <div className={`description ${descId === i ? 'show' : ''}`}
      dangerouslySetInnerHTML={{__html: episode.description}}
    />
  </div>
)

const mapDispatchtoProps = (dispatch: Dispatch) => ({
  playEpisode: (p: Podcast, e: Episode) => dispatch(selectEpisode(p, e))
})

export default connect(null, mapDispatchtoProps)(Episodes)
