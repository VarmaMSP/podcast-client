// @flow
import type {Match, RouterHistory} from 'react-router-dom';

import React from 'react';
import {withRouter} from 'react-router-dom';

type Props = {|
  match: Match,
  history: RouterHistory
|}

const Links = ({history}: Props) => (
  <div className='links'>
    <div className='link one' onClick={e => history.push('/subscriptions')}>
      Subscriptions
    </div>
    <div className='link two' onClick={e => history.push('/subscriptions')}>
      Feed
    </div>
  </div>
);

export default withRouter(Links);
