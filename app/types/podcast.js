// @flow
export type Podcast = {|
  id: number,
  title: string,
  artist: string,
  imageUrl: string,
  feedUrl: string
|};

export type Episode = {|
  title: string,
  description: string,
  date: string,
  link: string,
  fileType: string
|};

export type AudioData = {|
  episode: Episode,
  podcast: Podcast
|};

export type FeedScheme = {|
  podcastId: number,
  lastModified: string,
  episodes: Array<Episode>
|};
