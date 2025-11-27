import React, { useState } from "react";
import styles from './dashboard.module.css';
import NavigationBar from "../components/NavigationBar/navigation_bar.jsx";
import SensorChart from "../components/SensorChart.jsx";
import ParameterCards from "../components/ParametersCards/parameter_cards.jsx";
import ChartSettings from "../components/ChartSettings/chart_settings.jsx";
import { useSensorData } from "../../hooks/useSensorData.js";
import { useMenuToggle } from "../../hooks/useMenuToggle.js";
import { getTodayDate } from "../../utils/formatters.js";
import { getSensorStatus } from "../../utils/formatters.js";

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
      <div className={styles.bodyContainer}>
        <button className={styles.menuToggle}>
          <img src="src/views/assets/images/Menu.png" alt="Меню" />
        </button>
        <NavigationBar isMenuOpen={isMenuOpen} />

        <div className={styles.dashboard}>
          <div className={styles.leftContainer}>
            <p className={styles.currentPlace}>Общежитие, комната 525</p>

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

          <div className={styles.rightContainer}>
            <div className={styles.sensorListContainer}>
              <p>Датчики в помещении</p>
              <div className={styles.sensorCardContainer}>
                <img
                  src="src/views/assets/images/RFID Signal.png"
                  alt="Датчик"
                />
                <p>Вояджер 1</p>
                {status.text == "Оффлайн" ? (
                  <img
                    src="src/views/assets/images/Status Offline.png"
                    alt="Статус: Оффлайн"
                  />
                ) : (
                  <img
                    src="src/views/assets/images/Status Online.png"
                    alt="Статус: Онлайн"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
