import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Nav({ loggedIn }) {
  
  
  return (
    <nav>
      <ul  className='topnav'>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!loggedIn && (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        {loggedIn && (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
