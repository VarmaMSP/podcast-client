// @flow
import type {Match, RouterHistory} from 'react-router-dom';
import type {State} from '../../types/index';
import type {Podcast} from '../../types/podcast';

import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Subscription from './Subscription';

type Props = {|
  match: Match,
  history: RouterHistory,
  subscriptions: Array<Podcast>
|};

const Subscriptions = ({subscriptions, history} : Props) => (
  subscriptions.length > 0
    ? <div className='subscriptions'>
        <div className='header'>{'Subscriptions'}</div>
        {subscriptions.map((p, i) => <Subscription key={i} podcast={p} history={history}/>)}
      </div>
    : <div className='header info'>
        {"You have't subscribed to any podcasts."}
      </div>
);

const mapStatetoProps = ({subscriptions}: State) => ({subscriptions});

export default withRouter(
  connect(mapStatetoProps, null)(Subscriptions)
);
