import React, {PropTypes as Types} from 'react';
import {adjustDaysShown, checkboxClick} from '../actions/DetailedStockActions';

const DetailedStockForm = ({historyLength, daysShown, checkboxes}) => {
  return (
    <div>
      <label className="c-input c-checkbox">
        <input
          type="checkbox"
          onChange={() => checkboxClick('high')}
          checked={checkboxes.get('high')}>
        </input>
        <span className="c-indicator"></span>
        high
      </label>
      <label className="c-input c-checkbox">
        <input
          type="checkbox"
          onChange={() => checkboxClick('low')}
          checked={checkboxes.get('low')}>
        </input>
        <span className="c-indicator"></span>
        low
      </label>
      <label className="c-input c-checkbox">
        <input
          type="checkbox"
          onChange={() => checkboxClick('close')}
          checked={checkboxes.get('close')}>
        </input>
        <span className="c-indicator"></span>
        close
      </label>
      <div className="range range-primary">
        <input className="slider"
          type="range"
          defaultValue={daysShown}
          min="2"
          max={historyLength}
          onChange={event => adjustDaysShown(parseInt(event.target.value, 10))}
          step="1" />
      </div>
      <h4 className="base-text">{daysShown + ' days'}</h4>
    </div>
  );
};

DetailedStockForm.displayName = 'DetailedStockForm';
DetailedStockForm.propTypes = {
  daysShown: Types.number.isRequired,
  checkboxes: Types.object.isRequired,
};

export default DetailedStockForm;
