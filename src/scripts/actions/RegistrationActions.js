import alt from '../altInstance';
import {register} from '../services/apiService';

class RegistrationActions {
  register(email, password) {
    this.dispatch();
    const {registrationError, registrationSuccess} = this.actions;

    register(email, password)
      .then(registrationSuccess)
      .catch(response => {
        if (response instanceof Error) {
          registrationError(response.message);
        } else {
          if (response.data.message) {
            registrationError(response.data.message);
          } else {
            registrationError('Something went wrong. Please try again.');
          }
        }
      });
  }

  registrationError(error) {
    this.dispatch(error);
  }

  registrationSuccess() {
    this.dispatch();
  }
}

export default alt.createActions(RegistrationActions);
