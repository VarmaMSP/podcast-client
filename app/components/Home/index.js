// @flow
import type {State} from '../../types/index'

import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

type Props = {|
  redirect: boolean
|}

const Home = ({redirect}: Props) =>
  redirect
    ? <Redirect to='/feed' />
    : <div className='welcome'>
      <b>{'Welcome!'}</b>
      <p>{"Phenopod helps you to search, subscribe and listen to you favourite podcasts.Here's some stuff"}
        <br />
        {'you need to know, before getting started.'}
      </p>
      <ol>
        <li>{'Search for your favourite podcasts in the top right search bar.'}</li>
        <li>{'Phenopod uses browsers local storage and indexedDB to store your preferences. cool right!'}</li>
        <li>{"Phenopod is free and it's source code is"} <a href='https://github.com/VarmaMSP/phenopod' target='_blank'><u>{'open source.'}</u></a></li>
        <li>{'Hope you like the user interface.'}</li>
      </ol>
      <p>{'Enjoy listening to podcasts!'}</p>
    </div>

const mapStatetoProps = ({subscriptions}: State) => ({
  redirect: subscriptions.length > 0
})

export default connect(mapStatetoProps, null)(Home)
