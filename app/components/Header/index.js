// @flow
import React from 'react';

import Logo from './Logo';
import Search from './Search';

const Header = () => (
  <header>
    <div className='container'>
      <Logo/>
      <Search/>
    </div>
  </header>
);

export default Header;
