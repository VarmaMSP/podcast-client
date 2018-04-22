// @flow
import type {Podcast} from '../../types/podcast';
import React from 'react';

type Props = {|
  podcast: Podcast
|};

const Details = ({ podcast }: Props) => (
  <div className='details'>
    <img src={`${podcast.imageUrl}/400x400.jpg`}/>
    <div className='title'>{podcast.title}</div>
  </div>
);

export default Details;
