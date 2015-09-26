import React, {Component} from 'react';

import RegisterForm from '../components/RegisterForm';
import RegistrationStore from '../stores/RegistrationStore';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationState: RegistrationStore.getState(),
    };
    RegistrationStore.listen(this.onRegistrationStoreChange.bind(this));
  }

  onRegistrationStoreChange(newState) {
    this.setState({
      registrationState: newState,
    });
  }

  componentWillUnmount() {
    RegistrationStore.unlisten(this.onRegistrationStoreChange.bind(this));
  }

  render() {
    const {registrationState} = this.state;
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
