import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <Link className='navbar-brand' to='/'>
          My Blog
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav'>
            <Link className='nav-link' to='/blog'>
              Blog
            </Link>
            <Link className='nav-link' to='/compose'>
              Compose
            </Link>
          </div>
        </div>
      </nav>
    );
}

export default Navbar
