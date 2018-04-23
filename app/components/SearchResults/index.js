// @flow
import type {Match} from 'react-router-dom';
import type {RouterHistory} from 'react-router-dom';
import type {Podcast} from '../../types/podcast';
import type {Action, Dispatch} from '../../types/index';

import React, {Component} from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router';
import {selectPodcast} from '../../actions';
import fetchPodcasts from '../../api/search';

type Props = {
  match: Match,
  history: RouterHistory,
  selectPodcast: Podcast => Action
};

type State = {|
  podcasts: ?Array<Podcast>,
  loading: boolean,
  error: boolean
|};

class SearchResults extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      podcasts: undefined,
      loading: true,
      error: false
    };
  }

  handleResultsFetch(props: Props) {
    let { term } = props.match.params;
    if (term) {
      fetchPodcasts(term, 50)
        .then(podcasts => this.setState({
          podcasts: podcasts,
          loading: false,
          error: false
        }))
        .catch(() => this.setState({
          podcasts: undefined,
          loading: false,
          error: true
        }));
    }
  }

  handlePodcastSelect(podcast: Podcast) {
    return () => {
      this.props.selectPodcast(podcast);
      this.props.history.push('/podcast');
    }
  }

  componentDidMount() {
    this.handleResultsFetch.call(this, this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      podcasts: undefined,
      loading: true,
      error: false
    });
    this.handleResultsFetch.call(this, nextProps);
  }

  render() {
    let { error, loading, podcasts } = this.state;
    let onPodcastSelect = this.handlePodcastSelect.bind(this);
    return (
      <div className='search-results'>
        { loading
        ? <div className='loader'></div>
        : error || !podcasts
          ? <div className='error'>No Results Found</div>
          : podcasts.map(renderResult(onPodcastSelect))
        }
      </div>
    );
  }
}

const renderResult = (onSelect) => (podcast: Podcast, i: number) => (
  <div className='result' key={i} onClick={onSelect(podcast)}>
    <img src={`${podcast.imageUrl}/200x200.jpg`} className="podcast-image"/>
    <div className='title'>{podcast.title}</div>
    <div className='artist'>{podcast.artist}</div>
  </div>
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectPodcast: (podcast: Podcast) => dispatch(selectPodcast(podcast))
});

export default withRouter(
  connect(null, mapDispatchToProps)(SearchResults)
);
