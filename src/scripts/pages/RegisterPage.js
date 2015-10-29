import React, {Component} from 'react';

import RegisterForm from '../components/RegisterForm';

class RegisterPage extends Component {
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
          <RegisterForm
            errorMessage={errorMessage}
            isLoading={isLoading} />
        </div>
      </div>
    );
  }
}

export default RegisterPage;
