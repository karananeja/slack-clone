import React from 'react';
import { AccessTime, HelpOutline, Search } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { useStateValue } from '../StateProvider';
import '../css/Header.css';

const Header = () => {
  const [{ user }] = useStateValue();
  return (
    <div className='header'>
      <div className='header__left'>
        <Avatar
          className='header__avatar'
          alt={user?.displayName}
          src={user?.photoURL}
        />
        <AccessTime />
      </div>
      <div className='header__search'>
        <Search />
        <input type='text' placeholder={`Search ${user?.displayName}`} />
      </div>
      <div className='header__right'>
        <HelpOutline />
      </div>
    </div>
  );
};

export default Header;
