// @flow
import type {Podcast as PodcastType} from '../../types/podcast';
import type {State} from '../../types/index';
import React from 'react';
import {connect} from 'react-redux';

import Details from './Details';
import Episodes from './Episodes';

type Props = {|
  podcast: ?PodcastType
|};

const Podcast = ({ podcast }: Props) => (
  podcast
    ? <div className ='podcast'>
        <Details podcast={podcast}/>
        <Episodes podcast={podcast}/>
      </div>
    : undefined
);

const mapStatetoProps = ({ podcast }: State) => ({ podcast });

export default connect(mapStatetoProps, null)(Podcast);
