import React from 'react';

const StrikedText = ({children}) => (
  <div className="striked-text-wrapper">
    <span className="striked-text">
      {children}
    </span>
  </div>
);

StrikedText.displayName = 'StrikedText';

export default StrikedText;
