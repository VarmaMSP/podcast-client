// @flow
import type {Action, Dispatch} from '../../types/index';
import type {Podcast} from '../../types/podcast';
import React from 'react';
import {connect} from 'react-redux';

import {subscribeToPodcast, unsubscribePodcast} from '../../actions/async';

type Props = {|
  podcast: Podcast,
  subscribed: boolean,
  isSubscribing: boolean,
  subscribe: Podcast => Action,
  unsubscribe: Podcast => Action
|};

const Details = (props: Props) => {
  let { podcast, subscribed, isSubscribing } = props;
  let onToggle = e => subscribed ? props.unsubscribe(podcast) : props.subscribe(podcast);
  return (
    <div className='details'>
      <img src={`${podcast.imageUrl}/400x400.jpg`}/>
      <div className='title'>{podcast.title}</div>
      <div className={`subscription-button ${subscribed ? 'inactive' : 'active'}`} onClick={e => onToggle(podcast)}>
        { isSubscribing
        ? 'SUBSCRIBING...'
        : subscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'
        }
      </div>
    </div>
  );
};

const mapDispatchtoProps = (dispatch: Dispatch) => ({
  subscribe: (podcast: Podcast) => dispatch(subscribeToPodcast(podcast)),
  unsubscribe: (podcast: Podcast) => dispatch(unsubscribePodcast(podcast))
});

export default connect(null, mapDispatchtoProps)(Details);
