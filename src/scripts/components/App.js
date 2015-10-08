import React, {Component, Children, cloneElement} from 'react';

import Navbar from './Navbar';
import AuthenticationStore from '../stores/AuthenticationStore';
import {getTokenFromStorage} from '../actions/AuthenticationActions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginState: AuthenticationStore.getState(),
    };
    AuthenticationStore.listen(this.onAuthenticationStoreChange.bind(this));
  }

  onAuthenticationStoreChange(newState) {
    this.setState({
      loginState: newState,
    });
  }

  componentDidMount() {
    getTokenFromStorage();
  }

  componentWillUnmount() {
    AuthenticationStore.unlisten(this.onAuthenticationStoreChange.bind(this));
  }

  render() {
    const {children} = this.props;
    const loggedIn = this.state.loginState.get('token').length > 0;
    // transferring props to children is not the same as usual nested components
    const childNodesWithProps = Children.map(children, child => {
      return cloneElement(child, {loggedIn});
    });

    return (
      <div>
        <Navbar
          currentPath={this.props.location.pathname}
          loggedIn={loggedIn}/>
        {childNodesWithProps}
      </div>
    );
  }
}

export default App;
