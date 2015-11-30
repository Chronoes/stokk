import React, {Component, PropTypes as Types} from 'react';

import {logout} from '../actions/AuthenticationActions';

class UserDropdown extends Component {
  static displayName = 'UserDropdown';
  static propTypes = {
    email: Types.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {isOpen: false};
    this.isHovering = false;
    this.onPageClick = this.onPageClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.onPageClick);
  }

  onPageClick() {
    if (!this.isHovering) {
      this.close();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.onPageClick);
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
          <span className="email-dropdown">{email}</span>
          <i className="icon-dropdown"></i>
        </button>
        {isOpen ? menu : ''}
      </div>
    );
  }
}

export default UserDropdown;
