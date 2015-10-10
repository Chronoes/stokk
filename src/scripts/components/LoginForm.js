import React, {Component} from 'react';

import Preloader from './Preloader';
import {login} from '../actions/AuthenticationActions';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEmailValid: true,
      isPasswordValid: true,
      errorMessage: '',
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const emailNode = this.refs.email;
    const passwordNode = this.refs.password;

    const email = emailNode.value.trim();
    const password = passwordNode.value;

    const errorMessages = [];

    if (errorMessages.length) {
      this.setState({
        isEmailValid: valids.email,
        arePasswordsValid: valids.passwords,
        errorMessage: errorMessages.shift(),
      });
    } else {
      login(email, password);
    }
  }

  render() {
    const {isLoading} = this.props;
    const errorMessage = this.props.errorMessage.length ? this.props.errorMessage : this.state.errorMessage;
    const errorNode = (
      <div className="register-alert">
        <strong>{errorMessage}</strong>
      </div>
    );
    const submitButton = (
      <input
        type="submit"
        value="login"
        className="btn btn-primary btn-block"
        id="LoginButton" />
    );
    return (
      <div className="register-form-container">
        <div className="stokk-card">
          <h4 className="card-title">Login</h4>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className={'form-group'}>
              <input
                type="email"
                ref="email"
                className="form-control"
                placeholder="e-mail" />
            </div>

            <div className={'form-group'}>
              <input
                type="password"
                ref="password"
                className="form-control"
                placeholder="password" />
            </div>

            {errorMessage ? errorNode : ''}

            <div className="form-group btn-register-form">
              {isLoading ? <Preloader /> : submitButton}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
