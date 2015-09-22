import React, {Component} from 'react';

import Navbar from './Navbar';
import AuthenticationStore from '../stores/AuthenticationStore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = AuthenticationStore.getState();
    AuthenticationStore.listen(state => this.setState(state));
  }

  render() {
    return (
      <div>
        <Navbar currentPath={this.props.location.pathname}/>
        {this.props.children}
      </div>
    );
  }
}

export default App;
