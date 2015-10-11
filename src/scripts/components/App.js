import React, {Component} from 'react';
import {decode} from 'jsonwebtoken';
import connectToStores from 'alt/utils/connectToStores';

import Navbar from './Navbar';
import AuthenticationStore from '../stores/AuthenticationStore';
import {getTokenFromStorage} from '../actions/AuthenticationActions';

@connectToStores
class App extends Component {
  constructor(props) {
    super(props);
  }

  static getStores() {
    return [AuthenticationStore];
  }

  static getPropsFromStores() {
    return {loginState: AuthenticationStore.getState()};
  }

  componentDidMount() {
    getTokenFromStorage();
  }

  render() {
    const {children, loginState} = this.props;
    const token = loginState.get('token');
    const loggedIn = token.length > 0;
    const email = loggedIn ? decode(token).email : '';

    return (
      <div>
        <Navbar
          loggedIn={loggedIn}
          email={email}/>
        {children}
      </div>
    );
  }
}

export default App;
