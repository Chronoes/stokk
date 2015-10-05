import React, {Component} from 'react';
import {Link} from 'react-router';

class Navbar extends Component {
  render() {
    const {loggedIn} = this.props;

    const dashboardLink = (
      <li className="nav-item" key="dashboardLink">
        <Link className="nav-link" activeClassName="active" to="/dashboard">Dashboard</Link>
      </li>
    );

    const authenticatedLinks = [
      dashboardLink,
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
  }
}

export default Navbar;
