// @flow
import type {Podcast as PodcastType} from '../../types/podcast';
import type {State} from '../../types/index';
import React from 'react';
import {connect} from 'react-redux';

import Details from './Details';
import Episodes from './Episodes';

type Props = {|
  podcast: ?PodcastType,
  subscribed: boolean,
  isSubscribing: boolean
|};

const Podcast = ({ podcast, subscribed, isSubscribing }: Props) => podcast
  ? <div className ='podcast'>
      <Details podcast={podcast} subscribed={subscribed} isSubscribing={isSubscribing}/>
      <Episodes podcast={podcast} cache={subscribed}/>
    </div>
  : <div> Search for your favourite podcasts.</div>

const mapStatetoProps = ({ podcast, subscriptions, addingNewSubscription }: State) => {
  let subscribed = false;
  if (podcast) {
    let { id } = podcast;
    for (let i = 0; i < subscriptions.length; ++i) {
      if (subscriptions[i].id === id) subscribed = true;
    }
  }
  return { podcast, subscribed, isSubscribing: addingNewSubscription }
};

export default connect(mapStatetoProps, null)(Podcast);
