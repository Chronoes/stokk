import React, {Component} from 'react';

import {register} from '../actions/RegistrationActions';

class RegisterForm extends Component {
  static MINIMUM_PASSWORD_LENGTH = 8;

  constructor(props) {
    super(props);
    this.state = {
      isEmailValid: true,
      arePasswordsValid: true,
      errorMessage: '',
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const emailNode = this.refs.email;
    const passwordOnceNode = this.refs.passwordOnce;
    const passwordTwiceNode = this.refs.passwordTwice;

    const email = emailNode.value.trim();
    const passwordOnce = passwordOnceNode.value;
    const passwordTwice = passwordTwiceNode.value;

    const valids = {
      email: true,
      passwords: true,
    };

    const errorMessages = [];

    if (email.length === 0) {
      valids.email = false;
      errorMessages.push('Please input an email.');
    }

    if (passwordOnce.length < RegisterForm.MINIMUM_PASSWORD_LENGTH) {
      valids.passwords = false;
      errorMessages.push('Please input a password of at least 8 characters.');
    }

    if (passwordOnce !== passwordTwice) {
      valids.passwords = false;
      errorMessages.push('Passwords don\'t match.');
    }

    if (errorMessages.length) {
      this.setState({
        isEmailValid: valids.email,
        arePasswordsValid: valids.passwords,
        errorMessage: errorMessages.shift(),
      });
    } else {
      register(email, passwordOnce);
      this.setState({
        isEmailValid: true,
        arePasswordsValid: true,
        errorMessage: '',
      });
    }
  }

  render() {
    const {isEmailValid, arePasswordsValid} = this.state;
    const {isLoading} = this.props;
    const errorMessage = this.props.errorMessage.length ? this.props.errorMessage : this.state.errorMessage;
    const errorNode = (
      <div className="register-alert">
        <strong>{errorMessage}</strong>
      </div>
    );
    return (
      <div className="register-form-container">
        <div className="stokk-card">
          <h4 className="card-title">Let's get started</h4>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className={'form-group' + (isEmailValid ? '' : ' has-error')}>
              <input
                type="email"
                ref="email"
                className="form-control"
                placeholder="E-mail" />
            </div>

            <div className={'form-group' + (arePasswordsValid ? '' : ' has-error')}>
              <input
                type="password"
                ref="passwordOnce"
                className="form-control"
                placeholder="Password" />
            </div>

            <div className={'form-group' + (arePasswordsValid ? '' : ' has-error')}>
              <input
                type="password"
                ref="passwordTwice"
                className="form-control"
                placeholder="Password again" />
            </div>

            {errorMessage ? errorNode : ''}

            <div className="form-group btn-register-form">
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary btn-block"
                disabled={isLoading}
                id="SubmitButton" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
