// @flow
import type {State} from '../../types/index';
import type {AudioData} from '../../types/podcast';

import React from 'react';
import {connect} from 'react-redux';

type Props = {|
  feed: Array<AudioData>
|};

const Feed = ({feed}: Props) => (
  <div>
    {feed.map(({podcast: p, episode: e}) => (
      <div>
        {p.title} by {e.date}
      </div>
    ))}
  </div>
);

const mapStatetoProps = ({userFeed}: State) => ({
  feed: userFeed
});

export default connect(mapStatetoProps, null)(Feed);
