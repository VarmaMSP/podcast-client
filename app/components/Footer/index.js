// @flow
import type {Podcast, Episode} from '../../types/podcast';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Albumart from './Albumart';

type Props = {
  podcast: ?Podcast,
  episode: ?Episode
};

class Footer extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let { podcast, episode } = this.props;
    return (
      <div className='footer'>
        <div className='container'>
          { podcast && episode
          ? (
              <div>
                <Albumart src={podcast.imageUrl}/>
              </div>
            )
          : undefined
          }
        </div>
      </div>
    )
  }
};

const mapStatetoProps = ({ nowPlaying }) => (
  nowPlaying
    ? nowPlaying
    : { podcast: null, episode: null }
);

export default connect(mapStatetoProps, null)(Footer);
