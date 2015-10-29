import React, {Component, Children, cloneElement} from 'react';
import {decode} from 'jsonwebtoken';
import connectToStores from 'alt/utils/connectToStores';

import Navbar from './Navbar';
import AuthenticationStore from '../stores/AuthenticationStore';


@connectToStores
class App extends Component {
  constructor(props) {
    super(props);
  }

  static getStores() {
    return [AuthenticationStore];
  }

  static getPropsFromStores() {
    return {authState: AuthenticationStore.getState()};
  }

  render() {
    const {children, authState} = this.props;
    const token = authState.get('token');
    const loggedIn = token.length > 0;
    const email = loggedIn ? decode(token).email : '';
    const childrenWithProps = Children.map(children, child => {
      return cloneElement(child, {email, authState});
    });
    return (
      <div>
        <Navbar
          loggedIn={loggedIn}
          email={email}/>
        {childrenWithProps}
      </div>
    );
  }
}

export default App;
