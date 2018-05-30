// @flow
import React from 'react'

/** GRID **/
type Props = {|
  children: Array<{|
    img: string,
    header: string,
    description: string,
    onClick: SyntheticEvent<HTMLElement> => void // eslint-disable-line no-undef
  |}>
|};

export const Grid = ({children}: Props) => (
  <div className='grid'>
    {
      children.map(({img, header, description, onClick}, i) => (
        <div className='grid-item' key={i} onClick={onClick}>
          <img src={img} />
          <div className='item-header'>{header}</div>
          <div className='item-description'>{description}</div>
        </div>
      ))
    }
  </div>
)
