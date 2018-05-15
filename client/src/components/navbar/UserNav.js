import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

const UserNav = props => (
  <Fragment>
    <NavLink to="/dashboard">Dashboard</NavLink>
    <NavLink to="/profile">Profile</NavLink>

    <Link to="/" onClick={props.logout}>Logout</Link>
  </Fragment>
);

UserNav.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default UserNav;
