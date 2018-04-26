// @flow
import React from 'react';

import Logo from './Logo';
import Links from './Links';
import Search from './Search';

const Header = () => (
  <header>
    <div className='container'>
      <Logo/>
      <Search/>
      <Links/>
    </div>
  </header>
);

export default Header;
