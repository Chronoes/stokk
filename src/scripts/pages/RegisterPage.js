import React, {Component} from 'react';

import connectToStores from 'alt/utils/connectToStores';
import RegisterForm from '../components/RegisterForm';
import RegistrationStore from '../stores/RegistrationStore';

@connectToStores
class RegisterPage extends Component {
  constructor(props) {
    super(props);
  }

  static getStores() {
    return [RegistrationStore];
  }

  static getPropsFromStores() {
    return {registrationState: RegistrationStore.getState()};
  }

  render() {
    const {registrationState} = this.props;
    const errorMessage = registrationState.get('errorMessage');
    const isLoading = registrationState.get('isLoading');
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
