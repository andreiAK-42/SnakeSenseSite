import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/Sensors_pc.css'

import NavigationBar from './components/NavigationBar.jsx';

function Sensors() {
  
  return (
    <div className="body-container">
      <NavigationBar />

      <table class="organization-sensors-list-container">
        <tr>
          <th>Название</th>
          <th>Местоположение</th>
          <th>Статус</th>
          <th>Последняя связь</th>
          <th>Действия</th>
        </tr>
        <tr>
          <td>Anom</td>
          <td>19</td>
          <td>Male</td>
        </tr>
        <tr>
          <td>Megha</td>
          <td>19</td>
          <td>Female</td>
        </tr>
        <tr>
          <td>Subham</td>
          <td>25</td>
          <td>Male</td>
        </tr>
        <tr>
          <td>Subham</td>
          <td>25</td>
          <td>Male</td>
        </tr>
      </table>
    </div>
  );
}

export default Sensors;