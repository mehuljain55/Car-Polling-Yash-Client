import React, { useState, useEffect } from 'react';

const TimeInput = ({ value, onChange }) => {
  const [error, setError] = useState('');
  const [period, setPeriod] = useState('AM');

  useEffect(() => {
    if (value) {
      const timeWithoutPeriod = value.split(' ')[0]; // Extract time without AM/PM
      const timePeriod = value.split(' ')[1] || 'AM';
      setPeriod(timePeriod);
      onChange(`${timeWithoutPeriod} ${timePeriod}`);
    }
  }, [value, onChange]);

  const validateTime = (time) => {
    const regex = /^(0?[1-9]|1[0-2]):([0-5][0-9])$/;
    if (!regex.test(time)) {
      setError('Invalid time format. Use HH:MM');
      return false;
    }
    setError('');
    return true;
  };

  const handleBlur = (e) => {
    let newValue = e.target.value;
    const time = newValue.split(' ')[0]; // Get the time part
    validateTime(time);
  };

  const handleChange = (e) => {
    let newValue = e.target.value.replace(/[^0-9:]/g, '');
    if (newValue.length === 2 && !newValue.includes(':')) {
      newValue = newValue.slice(0, 2) + ':';
    }
    onChange(newValue + ' ' + period); // Add period to the value
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
    onChange(value.split(' ')[0] + ' ' + e.target.value); // Update the value with the selected period
  };

  return (
    <div className="d-flex align-items-center">
      <input
        type="text"
        className={`form-control me-2 ${error ? 'is-invalid' : ''}`}
        value={value.split(' ')[0] || ''} // Only show time without period
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="HH:MM"
        maxLength="5"
        required
      />
      <select className="form-select" value={period} onChange={handlePeriodChange}>
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default TimeInput;
