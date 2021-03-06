// @flow
import type {Podcast as PodcastType} from '../../types/podcast'
import type {State} from '../../types/index'
import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Details from './Details'
import Episodes from './Episodes'

type Props = {|
  podcast: ?PodcastType,
  subscribed: boolean,
  isSubscribing: boolean
|}

const Podcast = ({ podcast, subscribed, isSubscribing }: Props) => podcast
  ? <div className='podcast'>
    <Details podcast={podcast} subscribed={subscribed} isSubscribing={isSubscribing} />
    <Episodes podcast={podcast} cache={subscribed} />
  </div>
  : <Redirect to='/feed' />

const mapStatetoProps = ({ podcast, subscriptions, addingNewSubscription }: State) => ({
  podcast,
  subscribed: podcast && subscriptions.some(s => (s.id === podcast.id)),
  isSubscribing: addingNewSubscription
})

export default connect(mapStatetoProps, null)(Podcast)
