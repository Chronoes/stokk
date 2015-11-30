import React, {PropTypes as Types} from 'react';

const StrikedText = ({children}) => (
  <div className="striked-text-wrapper">
    <span className="striked-text">
      {children}
    </span>
  </div>
);

StrikedText.displayName = 'StrikedText';
StrikedText.propTypes = {
  children: Types.string,
};

export default StrikedText;
