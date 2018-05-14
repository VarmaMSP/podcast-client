// @flow
import type {RouterHistory} from 'react-router-dom';
import type {Podcast} from '../../types/podcast';
import type {Dispatch} from '../../types/index';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import fetchPodcasts from '../../api/search';
import {selectPodcast} from '../../actions/index';
import {parseQueryString} from '../../utils/utils';
import {Grid, GridItem} from '../generic/Grid';
import {Loader} from '../generic/Utils';

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
  constructor(props: Props) {
    super(props);
    this.state = {
      results: [],
      loading: true,
      error: false
    };
  }

  handleResultsFetch({history}: Props) {
    let {q: term} = parseQueryString(history.location.search);
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

  handleResultSelect(result: Podcast) {
    let { history, selectPodcast } = this.props;
    return (e: SyntheticEvent<HTMLElement>) => {
      selectPodcast(result);
      history.push('/podcast');
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
    let onSelect = this.handleResultSelect.bind(this);
    if (loading) {
      return <Loader/>
    } else if (error) {
      return <div className='error'>No Results Found</div>
    } else {
      let gridItems = results.map((r, i) => (
        <GridItem key={i} img={r.imageUrl + '/200x200.jpg'}
          header={r.title} description={r.artist} onClick={onSelect(r)}
        />
      ));
      return <Grid>{gridItems}</Grid>
    }
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectPodcast: (podcast: Podcast) => dispatch(selectPodcast(podcast))
});

export default withRouter(
  connect(null, mapDispatchToProps)(SearchResults)
);
