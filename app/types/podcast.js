// @flow
export type Podcast = {|
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
