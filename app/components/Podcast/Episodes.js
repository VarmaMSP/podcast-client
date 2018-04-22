// @flow
import type {Podcast, Episode} from '../../types/podcast';

import React, {Component} from 'react';
import fetchEpisodes from '../../api/rssFeed';

type Props = {|
  podcast: Podcast
|};

type State = {|
  loading: boolean,
  error: boolean,
  episodes: Array<Episode>
|};

export default class Episodes extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    console.log(props.podcast);
    this.state = {
      loading: true,
      error: false,
      episodes: []
    };
  }

  handleEpisodesFetch(podcast: Podcast) {
    let reqOpts = {
      url: podcast.feedUrl,
      method: 'GET'
    };
    fetchEpisodes(reqOpts)
      .then(episodes => this.setState({
        loading: false,
        episodes
      }))
      .catch(() => this.setState({
        error: true
      }));
  }

  componentWillReceiveProps(nextProps: Props) {
    let { podcast } = nextProps;
    this.setState({ loading: true, error: false, episodes: [] });
    this.handleEpisodesFetch.call(this, podcast);
  }

  componentDidMount() {
    let { podcast } = this.props;
    this.handleEpisodesFetch.call(this, podcast);
  }

  render() {
    let { podcast } = this.props;
    let { episodes, loading, error } = this.state;

    return (
      <div className='episodes'>
        { loading
        ? <div className='loader'></div>
        : error
          ? <div className='error'>Error Fetching Podcasts.</div>
          : episodes.map(renderEpisode(() => null))
        }
      </div>
    );
  }
}

const renderEpisode = (onSelect) => (episode: Episode, i: number) => (
  <div className={'episode ' + (i % 2 ? 'dark' : 'light')} key={i}>
    <div className='episode-controls'>
      <div className='play-icon'><img src='/img/play-circle.png'/></div>
      <div className='episode-date'>{episode.date}</div>
    </div>
    <div className='episode-details'>
      <div className='title'>{episode.title}</div>
    </div>
  </div>
);
