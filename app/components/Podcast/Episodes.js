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
    <img className='play-icon' src='/img/play-circle.png'/>
    <div className='title'>{episode.title}</div>
    <div className='meta'>
      <span className='date'>{episode.date}</span>
      <span className='dot'> • </span>
      <label className='desc-toggle'>Show Description</label>
    </div>
    <div className='description'
      dangerouslySetInnerHTML={{__html: episode.description}}
    />
  </div>
);
