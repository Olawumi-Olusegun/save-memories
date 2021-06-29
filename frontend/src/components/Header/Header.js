import React from 'react';
import {  Link, useHistory } from 'react-router-dom';
const Header = () => {
      const history = useHistory();
      const handleLogOut = (e) => {
            e.preventDefault();
            if(localStorage.getItem('userProfile')) {
                  localStorage.removeItem('userProfile');
            }
            return history.push('/auth')
      }

      return (
            <header className="headers">
            <nav className="nav__bar">
                  <ul className="nav__links">
                  <li> <Link to="/">Home</Link> </li>
                  <li> <Link to="/creatememory">Create Memory</Link> </li>
                  {/* <li> <Link to="/listmemories">List Memories</Link> </li> */}
                  <li> <Link to="/about">About</Link> </li>
                  <li> <Link to="/contact">Contact</Link> </li>
                  <li> <Link to="/auth">Sign In</Link> </li>
                  <li> <Link to="/signout"  onClick={handleLogOut}>Sign Out</Link> </li>
                  </ul>
            </nav>
            </header>
      )
}

export default Header
