// @flow
import type {State as ReduxState, Dispatch, Action} from '../../types/index';
import type {Podcast, Episode, AudioData} from '../../types/podcast';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectEpisode, hideFeedNotification} from '../../actions/index';
import {formatDate} from '../../utils/utils';

type Props = {|
  feed: Array<AudioData>,
  playEpisode: (Podcast, Episode) => Action,
  hideFeedNotification: () => Action
|};

type State = {|
  descId: ?number,
  count: number
|};

class Feed extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      descId: undefined,
      count: 10
    };
  }

  componentDidMount() {
    this.props.hideFeedNotification();
  }

  handleDescToggle(id: number) {
    return (e: SyntheticEvent<HTMLElement>) => {
      let { descId } = this.state;
      this.setState({descId: descId !== id ? id : undefined});
    };
  }

  handlePlay(data: AudioData) {
    return (e: SyntheticEvent<HTMLElement>) => {
      let { playEpisode } = this.props;
      playEpisode(data.podcast, data.episode);
    };
  }

  handleLoadMore(e: SyntheticEvent<HTMLElement>) {
    let { count } = this.state;
    this.setState({ count: count + 10 });
  }

  render() {
    let { feed } = this.props;
    let { descId, count } = this.state;
    let onPlay = this.handlePlay.bind(this);
    let onLoadMore = this.handleLoadMore.bind(this);
    let onDescToggle = this.handleDescToggle.bind(this);
    return (
      feed.length > 0
        ? <div className='feed'>
            <div className='header'>{'Your Feed'}</div>
            {feed.slice(0, count).map(renderFeedItem(onPlay, onDescToggle, descId))}
            { count < feed.length
            ? <div className='load-more' onClick={onLoadMore}> load more episodes. </div>
            : undefined
            }
          </div>
        : <div className='header'>
            {"Your Feed is Empty, subscribe to podcasts to get started"}
          </div>
    )
  }
}

const renderFeedItem = (onPlay, onDescToggle, descId) => (feed: AudioData, i: number) => (
  <div className={'feed-item ' + (i % 2 ? 'dark' : 'light') + (descId === i ? ' show' : '')} key={i}>
    <img className='albumart' src={feed.podcast.imageUrl + '/200x200.jpg'}/>
    <img className='play-icon' src='/img/play-circle.png' onClick={onPlay(feed)}/>
    <div className='details'>
      <div className='episode-title'>{feed.episode.title}</div>
      <div className='podcast-title'>{feed.podcast.title}</div>
      <div className='meta'>
        <span className='date'>{formatDate(feed.episode.date)}</span>
        <span className='dot'> • </span>
        <span className='desc-toggle' onClick={onDescToggle(i)}>
          { descId === i ? 'Hide description' : 'Show description' }
        </span>
      </div>
      <div className='description'
        dangerouslySetInnerHTML={{__html: feed.episode.description}}
      />
    </div>
  </div>
)

const mapStatetoProps = ({userFeed}: ReduxState) => ({
  feed: userFeed
});

const mapDispatchtoProps = (dispatch: Dispatch) => ({
  playEpisode: (p: Podcast, e: Episode) => dispatch(selectEpisode(p, e)),
  hideFeedNotification: () => dispatch(hideFeedNotification())
});

export default connect(mapStatetoProps, mapDispatchtoProps)(Feed);
