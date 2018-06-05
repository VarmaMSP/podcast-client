// @flow
import type {State} from '../../types/index'
import type {Podcast, Episode} from '../../types/podcast'
import React from 'react'
import {connect} from 'react-redux'

import Albumart from './Albumart'
import Player from './Player'

type Props = {|
  podcast: ?Podcast,
  episode: ?Episode
|}

const Footer = ({ podcast, episode }: Props) => (
  <footer style={podcast && episode ? {} : {height: '0'}}>
    { podcast && episode
      ? <div className='container'>
        <Albumart src={podcast.imageUrl} />
        <Player podcastTitle={podcast.title} episode={episode} />
      </div>
      : undefined
    }
  </footer>
)

const mapStatetoProps = ({ nowPlaying }: State) => ({
  podcast: nowPlaying ? nowPlaying.podcast : undefined,
  episode: nowPlaying ? nowPlaying.episode : undefined
})

export default connect(mapStatetoProps, null)(Footer)
