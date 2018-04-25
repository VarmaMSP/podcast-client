// @flow
import type {RouterHistory} from 'react-router-dom';
import type {Action, Dispatch} from '../../types/index'
import type {Podcast} from '../../types/podcast';

import React from 'react';
import {connect} from 'react-redux';
import {selectPodcast} from '../../actions/index';

type Props = {|
  podcast: Podcast,
  history: RouterHistory,
  selectPodcast: Podcast => Action
|};

const Subscription = ({podcast, history, selectPodcast}: Props) => {
  let onSelect = (e: SyntheticEvent<HTMLElement>) => {
    selectPodcast(podcast);
    history.push('/podcast');
  };
  return (
    <div className='subscription' onClick={onSelect}>
      <img src={`${podcast.imageUrl}/200x200.jpg`}/>
      <div className='details'>
        <div className='title'>{podcast.title}</div>
        <div className='artist'><small>{'by '}</small>{podcast.artist}</div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectPodcast: (podcast: Podcast) => dispatch(selectPodcast(podcast))
});

export default connect(null, mapDispatchToProps)(Subscription);
