// @flow
import React from 'react'

type Props = {|
  total: number,
  current: number,
  paginate: number => () => any
|}

export const Pagination = ({total, current, paginate}: Props) => (
  <div className='pagination'>
    <div onClick={paginate(current - 1 >= 0 ? current - 1 : current)}
      className={current - 1 >= 0 ? 'arrow' : 'arrow disable'}
    >
      <img src='/img/left-arrow.png' />
    </div>
    {
      [...Array(total).keys()].map((i, j) => (
        <div className={i === current ? 'page active' : 'page'}
          onClick={paginate(i)} key={j}
        >
          {i + 1}
        </div>
      ))
    }
    <div onClick={paginate(current + 1 < total ? current + 1 : current)}
      className={current + 1 < total ? 'arrow' : 'arrow disable'}
    >
      <img src='/img/right-arrow.png' />
    </div>
  </div>
)
