import React, {Component} from 'react';

import Alert from './Alert';
import Preloader from './Preloader';
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

  static validate(email, password) {
    const valids = {
      email: true,
      passwords: true,
    };

    const errorMessages = [];

    if (email.length === 0) {
      valids.email = false;
      errorMessages.push('Please input an email.');
    }

    if (password.length < RegisterForm.MINIMUM_PASSWORD_LENGTH) {
      valids.passwords = false;
      errorMessages.push('Please input a password of at least 8 characters.');
    }

    return {errorMessages, valids};
  }

  onSubmit(event) {
    event.preventDefault();
    const emailNode = this.refs.email;
    const passwordOnceNode = this.refs.passwordOnce;
    const passwordTwiceNode = this.refs.passwordTwice;

    const email = emailNode.value.trim();
    const passwordOnce = passwordOnceNode.value;
    const passwordTwice = passwordTwiceNode.value;

    const {errorMessages, valids} = RegisterForm.validate(email, passwordOnce);

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

  componentWillReceiveProps(nextProps) {
    this.setState({errorMessage: nextProps.errorMessage});
  }

  componentWillUnmount() {
    this.setState({errorMessage: ''});
  }

  render() {
    const {errorMessage, isEmailValid, arePasswordsValid} = this.state;
    const {isLoading} = this.props;
    const alert = (
      <Alert message={errorMessage} type="danger" />
    );
    const submitButton = (
      <input
        type="submit"
        value="submit"
        className="btn btn-primary btn-block"
        id="SubmitButton" />
    );
    return (
      <div className="form-container">
        <div className="stokk-card">
          <h4 className="card-title">Register</h4>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className={'form-group' + (isEmailValid ? '' : ' has-error')}>
              <input
                type="email"
                ref="email"
                className="form-control"
                placeholder="e-mail" />
            </div>

            <div className={'form-group' + (arePasswordsValid ? '' : ' has-error')}>
              <input
                type="password"
                ref="passwordOnce"
                className="form-control"
                placeholder="password" />
            </div>

            <div className={'form-group' + (arePasswordsValid ? '' : ' has-error')}>
              <input
                type="password"
                ref="passwordTwice"
                className="form-control"
                placeholder="password again" />
            </div>

            {errorMessage ? alert : ''}

            <div className="form-group btn-form">
              {isLoading ? <Preloader /> : submitButton}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
