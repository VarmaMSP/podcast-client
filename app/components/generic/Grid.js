// @flow
import React from 'react';
import Container from './Container';

/**** GRID COMPONENT ****/
type Props = {|
  children: any
|};

export const Grid = ({children}: Props) => (
  <div className='grid'>
    {children}
  </div>
);

/**** GRID ITEM COMPONENT ****/
type Props_ = {|
  img: string,
  header?: string,
  description?: string,
  onClick: SyntheticEvent<HTMLElement> => void
|}

export const GridItem = ({img, header, description, onClick}: Props_) => (
  <div className='grid-item' onClick={onClick}>
    <img src={img}/>
    <div className='item-header'>{header}</div>
    <div className='item-description'>{description}</div>
  </div>
);
