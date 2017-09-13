import React from 'react';
import logo from './logo.svg';
import './styles.css';

const Header = () => {
  return(
    <div className="header">
      <img className="header-logo" src={logo} />
      <h1>Departments & Employees editor application</h1>
    </div>
  )
}

export default Header;
