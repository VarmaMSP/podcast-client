// @flow
import type {Match, RouterHistory} from 'react-router-dom';

import React from 'react';
import {withRouter} from 'react-router-dom';

type Props = {|
  match: Match,
  history: RouterHistory
|}

const Links = ({history}: Props) => {
  let pathname = history.location ? history.location.pathname : undefined;
  return (
    <div className='links'>
      <div className={`link one ${pathname === '/subscriptions' ? 'active' : ''}`}
        onClick={e => pathname !== '/subscriptions' ? history.push('/subscriptions') : undefined}>
        Subscriptions
      </div>
      <div className={`link two ${pathname === '/feed' ? 'active' : ''}`}
        onClick={e => pathname !== '/feed' ? history.push('/feed') : undefined}>
        Feed
      </div>
    </div>
  )
};

export default withRouter(Links);
