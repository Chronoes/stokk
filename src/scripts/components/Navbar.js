import React, {Component} from 'react';
import {Link} from 'react-router';

class Navbar extends Component {
  getLinkState(linkName) {
    const baseLinkClass = 'nav-item';
    const activeLinkClass = 'active';

    if (linkName === this.props.currentPath) {
      return baseLinkClass + ' ' +  activeLinkClass;
    }

    return baseLinkClass;
  }

  render() {
    const {loggedIn} = this.props;

    const dashboardLink = (
      <li className={this.getLinkState('/dashboard')} key="dashboardLink">
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
      </li>
    );

    const authenticatedLinks = [
      dashboardLink,
    ];

    const loginLink = (
      <li className={this.getLinkState('/login')} key="loginLink">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
    );

    const unAuthenticatedLinks = [
      loginLink,
    ];

    return (
      <nav className="stokk-navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><img src="drawing.svg" /></Link>
          <ul className="nav navbar-nav">
            {loggedIn ? authenticatedLinks : unAuthenticatedLinks}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
