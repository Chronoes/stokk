import React, {Component} from 'react';

import LoginForm from '../components/LoginForm';

class LoginPage extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
        	<LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
