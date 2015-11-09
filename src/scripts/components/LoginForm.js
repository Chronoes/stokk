import React, {Component} from 'react';

import Alert from './Alert';
import Preloader from './Preloader';
import {login} from '../actions/AuthenticationActions';
import RegisterForm from './RegisterForm';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const emailNode = this.refs.email;
    const passwordNode = this.refs.password;

    const email = emailNode.value.trim();
    const password = passwordNode.value;

    const {errorMessages} = RegisterForm.validate(email, password);

    if (errorMessages.length) {
      this.setState({errorMessage: errorMessages.shift()});
    } else {
      login(email, password);
      this.setState({errorMessage: ''});
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({errorMessage: nextProps.errorMessage});
  }

  componentWillUnmount() {
    this.setState({errorMessage: ''});
  }

  render() {
    const {isLoading} = this.props;
    const {errorMessage} = this.state;
    const alert = (
      <Alert message={errorMessage} type="danger" />
    );
    const submitButton = (
      <input
        type="submit"
        value="login"
        className="btn btn-primary btn-block"
        id="LoginButton" />
    );
    return (
      <div className="form-container">
        <div className="stokk-card">
          <h4 className="card-title">Login</h4>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
              <input
                type="email"
                ref="email"
                className="form-control"
                placeholder="e-mail" />
            </div>

            <div className="form-group">
              <input
                type="password"
                ref="password"
                className="form-control"
                placeholder="password" />
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

export default LoginForm;
