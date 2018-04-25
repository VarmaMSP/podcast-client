// @flow
import type {Action, Dispatch} from '../../types/index';
import type {Podcast} from '../../types/podcast';
import React from 'react';
import {connect} from 'react-redux';

import {subscribe, unsubscribe} from '../../actions/index';

type Props = {|
  podcast: Podcast,
  subscribed: boolean,
  subscribe: Podcast => Action,
  unsubscribe: Podcast => Action
|};

const Details = (props: Props) => {
  let { podcast, subscribed } = props;
  let onToggle = e => subscribed ? props.unsubscribe(podcast) : props.subscribe(podcast);
  return (
    <div className='details'>
      <img src={`${podcast.imageUrl}/400x400.jpg`}/>
      <div className='title'>{podcast.title}</div>
      <div className={`subscription-button ${subscribed ? 'inactive' : 'active'}`} onClick={e => onToggle(podcast)}>
        {subscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}
      </div>
    </div>
  )
};

const mapDispatchtoProps = (dispatch: Dispatch) => ({
  subscribe: (podcast: Podcast) => dispatch(subscribe(podcast)),
  unsubscribe: (podcast: Podcast) => dispatch(unsubscribe(podcast))
});

export default connect(null, mapDispatchtoProps)(Details);
