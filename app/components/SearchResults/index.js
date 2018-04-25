// @flow
import type {Match, RouterHistory} from 'react-router-dom';
import type {Podcast} from '../../types/podcast';
import type {Action, Dispatch} from '../../types/index';

import React, {Component} from 'react';
import {withRouter} from 'react-router';
import fetchPodcasts from '../../api/search';
import Result from './Result';

type Props = {|
  match: Match,
  history: RouterHistory,
|};

type State = {|
  results: Array<Podcast>,
  loading: boolean,
  error: boolean
|};

class SearchResults extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      results: [],
      loading: true,
      error: false
    };
  }

  handleResultsFetch(props: Props) {
    let { term } = props.match.params;
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
        }));
    }
  }

  componentDidMount() {
    this.handleResultsFetch.call(this, this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({ results: undefined, loading: true, error: false });
    this.handleResultsFetch.call(this, nextProps);
  }

  render() {
    let { history } = this.props;
    let { error, loading, results } = this.state;
    return (
      <div className='search-results'>
        { loading
        ? <div className='loader'></div>
        : error
          ? <div className='error'>No Results Found</div>
          : results.map((result, i) => <Result key={i} result={result} history={history}/>)
        }
      </div>
    );
  }
}

export default withRouter(SearchResults);
