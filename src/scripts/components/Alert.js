import React, {PropTypes as Types} from 'react';

const Alert = props => {
  const {message, type} = props;
  return (
    <div className={`alert --${type} ${props.margin ? `--margin-${props.margin}` : ''}`}>
      <strong>{message}</strong>
    </div>
  );
};

Alert.propTypes = {
  message: Types.string.isRequired,
  type: Types.oneOf(['warning', 'danger', 'info']).isRequired,
  margin: Types.oneOf(['top', 'bottom']),
};

Alert.displayName = 'Alert';

export default Alert;
