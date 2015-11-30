import React, {PropTypes as Types} from 'react';
import {Map} from 'immutable';

import RegisterForm from '../components/RegisterForm';

const RegisterPage = ({authState}) => {
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
};

RegisterPage.displayName = 'RegisterPage';
RegisterPage.propTypes = {
  authState: Types.instanceOf(Map),
};

export default RegisterPage;
