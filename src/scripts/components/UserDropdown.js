import React, {Component} from 'react';

import {logout} from '../actions/AuthenticationActions';

class UserDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.isHovering = false;
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.onPageClick.bind(this));
  }

  onPageClick() {
    if (!this.isHovering) {
      this.close();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.onPageClick.bind(this));
  }

  toggleOpen() {
    this.setState({isOpen: !this.state.isOpen});
  }

  close() {
    this.setState({isOpen: false});
  }

  render() {
    const {email} = this.props;
    const {isOpen} = this.state;
    const menu = (
      <div className="dropdown-menu dropdown-menu-right">
        <a className="dropdown-item disabled">Settings</a>
        <button
          className="dropdown-item"
          onClick={logout}>
          Logout
        </button>
      </div>
    );
    return (
      <div
        className={'dropdown' + (isOpen ? ' open' : '')}
        onMouseOver={() => this.isHovering = true}
        onMouseOut={() => this.isHovering = false}>
        <button
          className="btn-navbar-dropdown"
          onClick={this.toggleOpen.bind(this)}>
          {email}
        </button>
        {isOpen ? menu : ''}
      </div>
    );
  }
}

export default UserDropdown;
