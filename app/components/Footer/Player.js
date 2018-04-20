// @flow
import type {Episode} from '../../types/podcast';
import React, {Component} from 'react';

type Props = {|
  podcastTitle: string,
  episode: Episode
|};

type State = {|
  status: 'PLAY' | 'PAUSE' | 'LOAD' | 'SEEK',
  duration: number,
  currentTime: number,
  reload: boolean
|};

const audio: any = document.createElement('audio');

export default class Audio extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      status: 'LOAD',
      duration: 0,
      currentTime: 0,
      reload: false
    };
    // handle pause and play
    audio.addEventListener('pause', () =>
      this.setState({status: 'PAUSE'})
    );
    audio.addEventListener('play', () =>
      this.setState({status: 'PLAY'})
    );
    // handle change in duration and currentTime
    audio.addEventListener('durationchange', () =>
      this.setState({duration: audio.duration})
    );
    audio.addEventListener('timeupdate', () =>
      this.setState({currentTime: audio.currentTime})
    );
    // handle seek
    audio.addEventListener('seeking', () => {
      audio.pause();
      this.setState({status: 'SEEK'});
    });
    audio.addEventListener('seeked', () => {
      audio.play();
      this.setState({status: 'PLAY'});
    });
    // handle initial load
    audio.addEventListener('loadstart', () =>
      this.setState({status: 'LOAD'})
    );
    audio.addEventListener('canplay', () => {
      audio.play();
      this.setState({status: 'PLAY'});
    });
    // Keyboard events
    window.addEventListener('keydown', ({ keyCode }) => {
      let { status } = this.state;
      switch (keyCode) {
        case 32: {
          if (status === 'PLAY') {
            audio.pause();
            this.setState({status: 'PAUSE'});
          }
          if (status === 'PAUSE') {
            audio.play();
            this.setState({status: 'PLAY'});
          }
          break;
        }
      }
    });
  }

  componentWillMount() {
    audio.src = this.props.episode.link;
    audio.type = this.props.episode.fileType;
  }

  componentDidMount() {
    audio.play();
  }

  componentWillReceiveProps(nextProps: Props) {
    audio.src = nextProps.episode.link;
    audio.type = nextProps.episode.fileType;
    this.setState({reload: true});
  }

  componentDidUpdate() {
    if (this.state.reload === true) {
      this.setState({reload: false});
      audio.load();
      audio.play();
    }
  }

  handleToggle() {
    let { status } = this.state;
    if (status === 'PLAY') {
      audio.pause();
      this.setState({status: 'PAUSE'});
    }
    if (status === 'PAUSE') {
      audio.play();
      this.setState({status: 'PLAY'});
    }
  }

  handleSeek(e: SyntheticInputEvent<HTMLInputElement>) {
    let seekTime = e.target.value;
    audio.currentTime = Number(seekTime);
  }

  handleVolumeChange(e: SyntheticInputEvent<HTMLInputElement>) {
    let volume = e.target.value;
    audio.volume = Number(volume) / 100;
  }

  render() {
    let { duration, currentTime, status } = this.state;
    let { podcastTitle, episode } = this.props;
    let { title, date } = episode;

    return (
      <div>
        {/* CONTROLS */}
        <div className='controls'>
          <img src='/img/play.png' id='play'/>
          <img src='/img/arrow.png' id='arrow'/>
        </div>

        <div className='player'>
          {/* DETAILS */}
          <div className='details'>
            <div className='now-playing'>Now Playing</div>
            <div className='episode'>
              <span className='title'>{title}</span>
              <span className='dot'> • </span>
              <span className='date'>{date}</span>
            </div>
            <div className='podcast-title'>{podcastTitle}</div>
          </div>

          {/* PLAYER */}
          <div className='audio'>
          </div>
        </div>
      </div>
    )
  }
}
