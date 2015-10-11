import React, {Component} from 'react';
import {decode} from 'jsonwebtoken';

import Navbar from './Navbar';
import AuthenticationStore from '../stores/AuthenticationStore';
import {getTokenFromStorage} from '../actions/AuthenticationActions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginState: AuthenticationStore.getState(),
    };
  }

  onAuthenticationStoreChange(newState) {
    this.setState({
      loginState: newState,
    });
  }

  componentWillMount() {
    AuthenticationStore.listen(this.onAuthenticationStoreChange.bind(this));
  }

  componentDidMount() {
    getTokenFromStorage();
  }

  componentWillUnmount() {
    AuthenticationStore.unlisten(this.onAuthenticationStoreChange.bind(this));
  }

  render() {
    const {loginState} = this.state;
    const {children} = this.props;
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
