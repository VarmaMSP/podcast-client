// @flow
import type {Action, Dispatch} from '../../types/index';
import type {RouterHistory} from 'react-router-dom';
import type {Podcast} from '../../types/podcast';
import React from 'react';
import {connect} from 'react-redux';

import {selectPodcast} from '../../actions/index';

type Props = {|
  result: Podcast,
  history: RouterHistory,
  selectPodcast: Podcast => Action
|}

const Result = ({ result, history, selectPodcast }: Props) => {
  let handleOnClick = e => {
    selectPodcast(result);
    history.push('/podcast');
  };
  return (
    <div className='result' onClick={handleOnClick}>
      <img src={`${result.imageUrl}/200x200.jpg`} className="podcast-image"/>
      <div className='title'>{result.title}</div>
      <div className='artist'>{result.artist}</div>
    </div>
  )
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  selectPodcast: (podcast: Podcast) => dispatch(selectPodcast(podcast))
});

export default connect(null, mapDispatchToProps)(Result);
