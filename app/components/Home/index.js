// @flow
import type {RouterHistory} from 'react-router-dom'
import type {Podcast} from '../../types/podcast'
import type {Dispatch} from '../../types/index'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Grid} from '../generic/Grid'
import {Loader} from '../generic/Utils'
import {Pagination} from '../generic/Pagination'
import getTrending from '../../api/trending'
import {selectPodcast} from '../../actions/index'

type Props = {|
  history: RouterHistory,
  selectPodcast: Podcast => any
|}

type State = {|
  podcasts: Array<Podcast>,
  loading: boolean,
  count: number,
  offset: number
|}

class Home extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      podcasts: [],
      loading: true,
      count: 10,
      offset: 0
    }
  }

  componentDidMount () {
    getTrending()
      .then(x => this.setState({
        podcasts: x,
        loading: false
      }))
      .catch(console.log)
  }

  handlePaginate (pageNo: number) {
    return () => {
      this.setState({offset: pageNo})
    }
  }

  handlePodcastSelect (result: Podcast) {
    let { history, selectPodcast } = this.props
    return () => {
      selectPodcast(result)
      history.push('/podcast')
    }
  }

  render () {
    let { podcasts, loading, count, offset } = this.state
    let onPaginate = this.handlePaginate.bind(this)
    let onSelect = this.handlePodcastSelect.bind(this)
    return (
      loading
        ? <Loader />
        : <div>
          <div className='welcome'>
            {'Welcome, you can search, subscribe and listen to you favourite podcasts here. Get Started by checking out these trending podcasts.'}
          </div>
          <br />
          <Grid>{
            podcasts.slice(offset * count, (offset + 1) * count).map(p => ({
              img: p.imageUrl + '/200x200.jpg',
              header: p.title,
              description: p.artist,
              onClick: onSelect(p)
            }))
          }</Grid>
          <br />
          <Pagination total={Math.ceil(podcasts.length / count)} current={offset} paginate={onPaginate} />
        </div>
    )
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectPodcast: (podcast: Podcast) => dispatch(selectPodcast(podcast))
})

export default withRouter(
  connect(null, mapDispatchToProps)(Home)
)
