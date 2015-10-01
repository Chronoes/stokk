import React, {Component} from 'react';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEmailValid: true,
      isPasswordValid: true,
    };
  }

  onSubmit(event) {
    event.preventDefault();
  }

  render() {
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
                placeholder="E-mail" />
            </div>

            <div className={'form-group'}>
              <input
                type="password"
                ref="password"
                className="form-control"
                placeholder="Password" />
            </div>

            <div className="form-group btn-register-form">
              <input
                type="submit"
                value="Login"
                className="btn btn-primary btn-block"
                id="LoginButton" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
