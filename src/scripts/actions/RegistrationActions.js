import alt from '../altInstance';
import {register} from '../services/apiService';
import routerContainer from '../routerContainer';

@alt.createActions
class RegistrationActions {
  register(email, password) {
    this.dispatch();
    const {registrationError, registrationSuccess} = this.actions;

    register(email, password)
      .then(response => registrationSuccess(response.data.token))
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

  registrationSuccess(token) {
    localStorage.setItem('token', token);
    this.dispatch(token);
    routerContainer.transitionTo('/');
  }
}

export default RegistrationActions;
