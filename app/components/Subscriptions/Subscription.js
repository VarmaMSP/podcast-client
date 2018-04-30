// @flow
import type {RouterHistory} from 'react-router-dom';
import type {Action, Dispatch} from '../../types/index'
import type {Podcast} from '../../types/podcast';

import React from 'react';
import {connect} from 'react-redux';
import {unsubscribePodcast} from '../../actions/async';
import {selectPodcast} from '../../actions/index';

type Props = {|
  podcast: Podcast,
  history: RouterHistory,
  selectPodcast: Podcast => Action,
  unsubscribe: Podcast => Action
|};

const Subscription = ({podcast, history, selectPodcast, unsubscribe}: Props) => {
  let onSelect = (e: SyntheticEvent<HTMLElement>) => {
    selectPodcast(podcast);
    history.push('/podcast');
  };
  return (
    <div className='subscription'>
      <img src={`${podcast.imageUrl}/200x200.jpg`} onClick={onSelect}/>
      <div className='unsubscribe-button' onClick={e => unsubscribe(podcast)}>
        {'UNSUBSCRIBE'}
      </div>
      <div className='details'>
        <div className='title' onClick={onSelect}>{podcast.title}</div>
        <div className='artist'><small>{'by '}</small>{podcast.artist}</div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectPodcast: (podcast: Podcast) => dispatch(selectPodcast(podcast)),
  unsubscribe: (podcast: Podcast) => dispatch(unsubscribePodcast(podcast))
});

export default connect(null, mapDispatchToProps)(Subscription);
