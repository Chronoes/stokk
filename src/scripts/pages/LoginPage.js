import React, {PropTypes as Types} from 'react';
import {Map} from 'immutable';

import LoginForm from '../components/LoginForm';

const LoginPage = ({authState}) => {
  const errorMessage = authState.get('errorMessage');
  const isLoading = authState.get('isLoading');
  return (
    <div className="container-fluid">
      <div className="row">
        <LoginForm
          errorMessage={errorMessage}
          isLoading={isLoading} />
      </div>
    </div>
  );
};

LoginPage.displayName = 'LoginPage';
LoginPage.propTypes = {
  authState: Types.instanceOf(Map),
};

export default LoginPage;
