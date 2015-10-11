import React, {Component} from 'react';

import connectToStores from 'alt/utils/connectToStores';
import LoginForm from '../components/LoginForm';
import AuthenticationStore from '../stores/AuthenticationStore';

@connectToStores
class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  static getStores() {
    return [AuthenticationStore];
  }

  static getPropsFromStores() {
    return {loginState: AuthenticationStore.getState()};
  }

  render() {
    const {loginState} = this.props;
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
