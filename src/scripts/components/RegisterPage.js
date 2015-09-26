import React, {Component} from 'react';

import RegisterForm from './RegisterForm';

class RegisterPage extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <RegisterForm />
        </div>
      </div>
    );
  }
}

export default RegisterPage;
