// @flow
import type {RouterHistory} from 'react-router-dom'
import type {Podcast} from '../../types/podcast'
import type {Dispatch} from '../../types/index'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import fetchPodcasts from '../../api/search'
import {selectPodcast} from '../../actions/index'
import {parseQueryString} from '../../utils/utils'
import {Grid} from '../generic/Grid'
import {Loader, Message} from '../generic/Utils'

type Props = {|
  history: RouterHistory,
  selectPodcast: Podcast => any;
|};

type State = {|
  results: Array<Podcast>,
  loading: boolean,
  error: boolean
|};

class SearchResults extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    this.state = {
      results: [],
      loading: true,
      error: false
    }
  }

  componentDidMount () {
    this.handleResultsFetch.call(this, this.props) // eslint-disable-line no-useless-call
  }

  componentWillReceiveProps (nextProps: Props) {
    this.setState({ results: undefined, loading: true, error: false })
    this.handleResultsFetch.call(this, nextProps) // eslint-disable-line no-useless-call
  }

  handleResultsFetch ({history}: Props) {
    let {q: term} = parseQueryString(history.location.search)
    if (term) {
      fetchPodcasts(term, 50)
        .then(results => this.setState({
          results,
          loading: false,
          error: false
        }))
        .catch(() => this.setState({
          loading: false,
          error: true
        }))
    }
  }

  handleResultSelect (result: Podcast) {
    let { history, selectPodcast } = this.props
    return (e: SyntheticEvent<HTMLElement>) => { // eslint-disable-line no-undef
      selectPodcast(result)
      history.push('/podcast')
    }
  }

  render () {
    let { error, loading, results } = this.state
    let onSelect = this.handleResultSelect.bind(this)
    return loading
      ? <Loader />
      : error
        ? <Message content='No Results Found' />
        : <div>
          <Message content='Search Results' />
          <Grid>{
            results.map(r => ({
              img: r.imageUrl + '/200x200.jpg',
              header: r.title,
              description: r.artist,
              onClick: onSelect(r)
            }))
          }</Grid>
        </div>
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectPodcast: (podcast: Podcast) => dispatch(selectPodcast(podcast))
})

export default withRouter(
  connect(null, mapDispatchToProps)(SearchResults)
)
