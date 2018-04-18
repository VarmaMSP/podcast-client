// @flow
import React from 'react';

import Search from './Search';

const Header = () => (
  <header>
    <div className='container'>
      <div className='logo'>
        Phenopod<sup> β</sup>
      </div>
      <Search/>
    </div>
  </header>
);

export default Header;
