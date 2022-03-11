import React from 'react';
import logo from './images/logo.svg';

export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <img className="as-logo header__as-logo" src={logo} alt="Логотип Aviasales" />
      </header>    
    );
  }
}