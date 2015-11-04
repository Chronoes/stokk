import React, {Component, Children, cloneElement} from 'react';
import {decode} from 'jsonwebtoken';
import connectToStores from 'alt/utils/connectToStores';

import Navbar from './Navbar';
import AuthenticationStore from '../stores/AuthenticationStore';
import StockStore from '../stores/StockStore';


@connectToStores
class App extends Component {
  constructor(props) {
    super(props);
  }

  static getStores() {
    return [AuthenticationStore, StockStore];
  }

  static getPropsFromStores() {
    return {authState: AuthenticationStore.getState(), stockState: StockStore.getState()};
  }

  render() {
    const {children, authState, stockState} = this.props;
    const token = authState.get('token');
    const loggedIn = token.length > 0;
    const email = loggedIn ? decode(token).email : '';
    const childrenWithProps = Children.map(children, child => {
      return cloneElement(child, {authState, stockState});
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
