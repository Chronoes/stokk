import React, {PropTypes as Types} from 'react';

const Alert = ({message, type, margin}) => (
  <div className={`alert --${type} ${margin ? `--margin-${margin}` : ''}`}>
    <strong>{message}</strong>
  </div>
);

Alert.propTypes = {
  message: Types.string.isRequired,
  type: Types.oneOf(['warning', 'danger', 'info']).isRequired,
  margin: Types.oneOf(['top', 'bottom']),
};

Alert.displayName = 'Alert';

export default Alert;
