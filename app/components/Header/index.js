// @flow
import React from 'react';

import Logo from './Logo';
import Links from './Links';
import Search from './Search';

const Header = () => (
  <div className='nav-bar'>
    <div className='container'>
      <Logo/>
      <Links/>
      <Search/>
    </div>
  </div>
);

export default Header;
