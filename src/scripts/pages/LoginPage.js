import React, {Component} from 'react';

import LoginForm from '../components/LoginForm';
import AuthenticationStore from '../stores/AuthenticationStore';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginState: AuthenticationStore.getState(),
    };
  }

  componentWillMount() {
    AuthenticationStore.listen(this.onAuthenticationStoreChange.bind(this));
  }

  onAuthenticationStoreChange(newState) {
    this.setState({
      loginState: newState,
    });
  }

  componentWillUnmount() {
    AuthenticationStore.unlisten(this.onAuthenticationStoreChange.bind(this));
  }

  render() {
    const {loginState} = this.state;
    const errorMessage = loginState.get('errorMessage');
    const isLoading = loginState.get('isLoading');
    return (
      <div className="container-fluid">
        <div className="row">
          <LoginForm
          errorMessage={errorMessage}
          isLoading={isLoading} />
        </div>
      </div>
    );
  }
}

export default LoginPage;
