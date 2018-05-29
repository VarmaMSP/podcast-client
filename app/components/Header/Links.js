// @flow
import type {State} from '../../types/index'
import type {Match, RouterHistory} from 'react-router-dom'

import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

type Props = {|
  match: Match,
  feedNotification: boolean,
  history: RouterHistory
|}

const Links = ({history, feedNotification}: Props) => {
  let pathname = history.location ? history.location.pathname : undefined
  return (
    <div>
      <div className={`link ${pathname === '/subscriptions' ? 'active' : ''}`}
        onClick={e => pathname !== '/subscriptions' ? history.push('/subscriptions') : undefined}>
        {'Subscriptions'}
      </div>
      <div className={`link ${pathname === '/feed' ? 'active' : ''}`}
        onClick={e => pathname !== '/feed' ? history.push('/feed') : undefined}>
        {'Feed'}
        { feedNotification
          ? <div className='notify'>•</div>
          : undefined
        }
      </div>
    </div>
  )
}

const mapStatetoProps = ({feedNotification}: State) => ({feedNotification})

export default withRouter(
  connect(mapStatetoProps, null)(Links)
)
