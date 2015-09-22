import React, {Component, Children, cloneElement} from 'react';

import Navbar from './Navbar';
import AuthenticationStore from '../stores/AuthenticationStore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = AuthenticationStore.getState();
    AuthenticationStore.listen(state => this.setState(state));
  }

  render() {
    const {children} = this.props;
    const token = this.state.get('token');
    const loggedIn = token.length > 0;
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
