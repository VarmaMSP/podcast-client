// @flow
import React from 'react'

// Spinner
export const Loader = () =>
  <div className='loader' />

// Message
export const Message = (props: {| content: string |}) =>
  <div className='message'>
    {props.content}
  </div>
