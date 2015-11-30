import React, {Component, Children, cloneElement, PropTypes as Types} from 'react';
import {decode} from 'jsonwebtoken';
import connectToStores from 'alt/utils/connectToStores';
import {Map} from 'immutable';

import Navbar from './Navbar';
import AuthenticationStore from '../stores/AuthenticationStore';


@connectToStores
class App extends Component {
  static displayName = 'App';
  static propTypes = {
    authState: Types.instanceOf(Map).isRequired,
    children: Types.oneOfType([Types.element, Types.arrayOf(Types.element)]),
  };

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
      return cloneElement(child, {authState});
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
