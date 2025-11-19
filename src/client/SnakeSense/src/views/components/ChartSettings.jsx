import React from 'react';

const ChartSettings = ({ 
  selectedParameter, 
  selectedDate, 
  onParameterChange, 
  onDateChange 
}) => {
  return (
    <div className='sensor-graph-settings'>
      <select 
        name="parameter" 
        id="parameter-select"
        value={selectedParameter}
        onChange={onParameterChange}
      >
        <option value="temperature">Температура</option>
        <option value="pressure">Давление</option>
        <option value="humidity">Влажность</option>
        <option value="bad_ppm">Концентрация газов</option>
      </select>

      <input 
        type="date" 
        name="calendar" 
        value={selectedDate}
        onChange={onDateChange}
        min="2025-10-29"
      />
    </div>
  );
};

export default ChartSettings;