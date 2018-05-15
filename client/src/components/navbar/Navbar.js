/* eslint react/jsx-closing-tag-location: 0 */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import UserNav from './UserNav';

const Navbar = ({ auth, logout }) => (
  <nav className="navigation">
    <ul>
      <NavLink to="/"><h3>Logo</h3></NavLink>
      { auth
          ? <UserNav logout={logout} />
          : (
            <Fragment>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Signup</NavLink>
            </Fragment>
            )
          }
    </ul>
  </nav>
);

Navbar.propTypes = {
  auth: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Navbar;
