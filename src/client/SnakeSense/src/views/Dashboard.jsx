import React, { useState } from "react";
import "./styles/Dashboard_pc.css";
import "./styles/mobile/Dashboard_mobile.css";
import NavigationBar from "./components/NavigationBar.jsx";
import SensorChart from "./components/SensorChart.jsx";
import ParameterCards from "./components/ParameterCards.jsx";
import ChartSettings from "./components/ChartSettings.jsx";
import { useSensorData } from "../hooks/useSensorData";
import { useMenuToggle } from "../hooks/useMenuToggle";
import { getTodayDate } from "../utils/formatters";

function Dashboard() {
  const [selectedParameter, setSelectedParameter] = useState("temperature");
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const { isMenuOpen } = useMenuToggle();
  const { sensorData, loading, error } = useSensorData(
    selectedDate,
    selectedDate
  );

  const handleParameterChange = (event) => {
    setSelectedParameter(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <>
      <div className="body-container">
        <button className="menu-toggle">
          <img src="src/views/assets/images/Menu.png" alt="Меню" />
        </button>
        <NavigationBar isMenuOpen={isMenuOpen} />

        <div className="dashboard">
          <div className="left-container">
            <h1>Здравствуйте, Андрей</h1>
            <p>Общежитие, комната 525</p>

            <ParameterCards sensorData={sensorData} />

            <ChartSettings
              selectedParameter={selectedParameter}
              selectedDate={selectedDate}
              onParameterChange={handleParameterChange}
              onDateChange={handleDateChange}
            />

            <SensorChart
              selectedParameter={selectedParameter}
              selectedDate={selectedDate}
              sensorData={sensorData}
              loading={loading}
              error={error}
            />
          </div>

          <div className="right-container">
            <p>Местное время 14.12 18:00</p>

            <div className="sensor-list-container">
              <p>Датчики в помещении</p>
              <div className="sensor-card-container">
                <img
                  src="src/views/assets/images/RFID Signal.png"
                  alt="Датчик"
                />
                <p>Вояджер 1</p>
                <img
                  src="src/views/assets/images/Status Online.png"
                  alt="Статус"
                />
              </div>
            </div>

            <div className="report-list-container">
              <p>Инциденты</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
