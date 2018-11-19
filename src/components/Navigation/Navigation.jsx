import React from 'react';
import './Navigation.scss';
import navButton from '../../images/nav-button.png';
import logo from '../../images/logo.png';

const Navigation = ({ links, toggleNavigation, resetSearch }) => {
  return (
    <div className='Navigation'>
      <div className='container'>
        <div className='logo'>
          <button onClick={resetSearch} className='home-button'><img src={logo} alt='Musica Logo'/> <span className='logo-text'>Musica</span></button>
        </div>
        <div className='nav-button'>
          <img onClick={toggleNavigation} src={navButton} alt='Open Navigation'/>
        </div>
        <div className='link-container'>
          <ul className='links'>
          <li className='header'>Menu</li>
          <li><button className='mobile-search' onClick={toggleNavigation}>Search</button></li>
          <li><button className='desktop-search'>Search</button></li>
            {links.map(link => (
              <li key={link.label}>
                <a target='_blank' rel='noopener noreferrer' href={link.url}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navigation;
