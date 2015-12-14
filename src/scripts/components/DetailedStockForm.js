import React, {PropTypes as Types} from 'react';
import {adjustDaysShown, checkboxClick} from '../actions/DetailedStockActions';

const DetailedStockForm = ({historyLength, daysShown, checkboxes}) => (
  <div className="dashboard__section">
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
    <br />
    <div className="row">
      <div className="col-xs-12 col-sm-2 col-md-1 base-text">
        {daysShown + ' days'}
      </div>
      <div className="col-xs-12 col-sm-4 col-md-5">
        <input className="slider"
          type="range"
          defaultValue={daysShown}
          min="2"
          max={historyLength}
          onChange={event => adjustDaysShown(parseInt(event.target.value, 10))}
          step="1" />
      </div>
    </div>
  </div>
);

DetailedStockForm.displayName = 'DetailedStockForm';
DetailedStockForm.propTypes = {
  historyLength: Types.number.isRequired,
  daysShown: Types.number.isRequired,
  checkboxes: Types.object.isRequired,
};

export default DetailedStockForm;
