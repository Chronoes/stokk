import React, {Component} from 'react';

import LoginForm from '../components/LoginForm';

class LoginPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {authState} = this.props;
    const errorMessage = authState.get('errorMessage');
    const isLoading = authState.get('isLoading');
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
