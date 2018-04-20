// @flow
import type {Podcast, Episode} from '../../types/podcast';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import Albumart from './Albumart';
import Player from './Player';

type Props = {
  podcast: ?Podcast,
  episode: ?Episode
};

const Footer = ({ podcast, episode }: Props) => (
  <footer>
    <div className='container'>
      { podcast && episode
      ? (
          <div>
            <Albumart src={podcast.imageUrl}/>
            <Player podcastTitle={podcast.title} episode={episode}/>
          </div>
        )
      : undefined
      }
    </div>
  </footer>
);

const mapStatetoProps = ({ nowPlaying }) => (
  nowPlaying
    ? nowPlaying
    : { podcast: null, episode: null }
);

export default connect(mapStatetoProps, null)(Footer);
