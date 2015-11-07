import React, {PropTypes as Types} from 'react';
import {Link} from 'react-router';

import UserDropdown from './UserDropdown';

const Navbar = ({loggedIn, email}) => {
  const dashboardLink = (
    <li className="nav-item" key="dashboardLink">
      <Link className="nav-link" activeClassName="active" to="/">Dashboard</Link>
    </li>
  );

  const dropdown = (
    <li className="nav-item-right" key="dropdownLink">
      <UserDropdown email={email} />
    </li>
  );

  const authenticatedLinks = [
    dashboardLink,
    dropdown,
  ];

  const loginLink = (
    <li className="nav-item" key="loginLink">
      <Link className="nav-link" activeClassName="active" to="/login">Login</Link>
    </li>
  );

  const registerLink = (
    <li className="nav-item" key="registerLink">
      <Link className="nav-link" activeClassName="active" to="/register">Register</Link>
    </li>
  );

  const unAuthenticatedLinks = [
    loginLink,
    registerLink,
  ];

  return (
    <nav className="stokk-navbar">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img className="navbar-brand-image" src="logo.svg" />
        </Link>
        <ul className="nav navbar-nav">
          {loggedIn ? authenticatedLinks : unAuthenticatedLinks}
        </ul>
      </div>
    </nav>
  );
};

Navbar.displayName = 'Navbar';
Navbar.propTypes = {
  loggedIn: Types.bool.isRequired,
  email: Types.string.isRequired,
};

export default Navbar;
