// @flow
import React from 'react'

type Props = {
  src: string
};

const Albumart = ({ src }: Props) => (
  <div className='album-art'>
    <img src={`${src}/250x250.jpg`} />
  </div>
)

export default Albumart
