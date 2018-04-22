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
  episodes: Array<Episode>,
  descId: ?number
|};

export default class Episodes extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    console.log(props.podcast);
    this.state = {
      loading: true,
      error: false,
      episodes: [],
      descId: undefined
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

  handleDescToggle(id: number) {
    let { descId } = this.state;
    return (e: SyntheticEvent<HTMLElement>) => {
      this.setState({descId: descId !== id ? id : undefined});
    }
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
    let { episodes, loading, error, descId } = this.state;
    let onSelect = () => null;
    let onDescToggle = this.handleDescToggle.bind(this);
    console.log(descId);
    return (
      <div className='episodes'>
        { loading
        ? <div className='loader'></div>
        : error
          ? <div className='error'>Error Fetching Podcasts.</div>
          : episodes.map(renderEpisode(onSelect, this.handleDescToggle.bind(this), descId))
        }
      </div>
    );
  }
}

const renderEpisode = (onSelect, onDescToggle, descId) => (episode: Episode, i: number) => (
  <div className={'episode ' + (i % 2 ? 'dark' : 'light')} key={i}>
    <img className='play-icon' src='/img/play-circle.png'/>
    <div className='title'>{episode.title}</div>
    <div className='meta'>
      <span className='date'>{episode.date}</span>
      <span className='dot'> • </span>
      <span className='desc-toggle' onClick={onDescToggle(i)}>
        { descId === i ? 'Hide description' : 'Show description' }
      </span>
    </div>
    <div className={`description ${descId === i ? 'show' : ''}`}
      dangerouslySetInnerHTML={{__html: episode.description}}
    />
  </div>
);
