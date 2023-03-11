import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [show, setShow] = useState(false);
  return (
    <main className= {`show ? 'space-toggle' : null`}>
      <header className={`header ${show ? 'space-toggle' : null}`}>
        <div className='header_toggle' onClick={() => setShow(!show)}>
          <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
        </div>
        <div className="header_user">
             <button className='btn'> Add Item </button>
             <button className='btn'> Delete Item </button>
             <p className='user'> user</p>
          </div>
      </header>
      <aside className={`sidebar ${show ? 'show' : null}`}>
        <nav className='nav'>
          <div>
            <NavLink to='/' className='nav-logo'>
              <i className={`fas fa-home-alt nav-logo-icon`}></i>
              <span className='nav-logo-name'>Homepage</span>
            </NavLink>
            <div className='nav-list'>
              <NavLink to='/dashboard' className='nav-link '>
                <i className='fas fa-tachometer-alt nav-link-icon'></i>
                <span className='nav-link-name'>Dashboard</span>
              </NavLink>
              <NavLink to='/about' className="nav-link">
                <i className='fas fa-hotel nav-link-icon'></i>
                <span className='nav-link-name'>About</span>
              </NavLink>
              <NavLink to='/services' className='nav-link'>
                <i className='fas fa-image nav-link-icon'></i>
                <span className='nav-link-name'>Services</span>
              </NavLink>
              <NavLink to='/contact' className='nav-link'>
                <i className='fas fa-dollar-sign nav-link-icon'></i>
                <span className='nav-link-name'>Contact</span>
              </NavLink>
            </div>
          </div>
        </nav>
      </aside>
    </main>
  );
};

export default Sidebar;
