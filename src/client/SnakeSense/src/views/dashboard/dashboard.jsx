import React, { useEffect, useMemo, useState } from "react";
import styles from "./dashboard.module.css";
import NavigationBar from "../components/NavigationBar/navigation_bar.jsx";
import SensorChart from "../components/SensorChart.jsx";
import ParameterCards from "../components/ParametersCards/parameter_cards.jsx";
import ChartSettings from "../components/ChartSettings/chart_settings.jsx";
import { useSensorData } from "../../hooks/useSensorData.js";
import { useMenuToggle } from "../../hooks/useMenuToggle.js";
import { getTodayDate } from "../../utils/formatters.js";
import { getSensorStatus } from "../../utils/formatters.js";
import { fetchSensors } from "../../services/api.js";

const ORGANIZATION_ID = "690181989755625641265a4f";

function Dashboard() {
  const [selectedParameter, setSelectedParameter] = useState("temperature");
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [sensors, setSensors] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [sensorsLoading, setSensorsLoading] = useState(true);
  const [sensorsError, setSensorsError] = useState("");
  const { isMenuOpen } = useMenuToggle();
  const { sensorData, loading, error } = useSensorData(
    selectedDate,
    selectedDate
  );

  useEffect(() => {
    const loadSensors = async () => {
      try {
        setSensorsLoading(true);
        setSensorsError("");
        const data = await fetchSensors(ORGANIZATION_ID);
        setSensors(data);
      } catch (err) {
        console.error("Не удалось загрузить датчики для dashboard:", err);
        setSensorsError("Не удалось загрузить список датчиков");
      } finally {
        setSensorsLoading(false);
      }
    };

    loadSensors();
  }, []);

  const sensorsByPlace = useMemo(() => {
    return sensors.reduce((acc, sensor) => {
      const place = sensor.settings?.place?.trim() || "Не указано";
      if (!acc[place]) {
        acc[place] = [];
      }
      acc[place].push(sensor);
      return acc;
    }, {});
  }, [sensors]);

  const placeOptions = useMemo(
    () => Object.keys(sensorsByPlace).sort(),
    [sensorsByPlace]
  );

  useEffect(() => {
    if (!placeOptions.length) {
      setSelectedPlace("");
      return;
    }

    if (!selectedPlace || !sensorsByPlace[selectedPlace]) {
      setSelectedPlace(placeOptions[0]);
    }
  }, [placeOptions, selectedPlace, sensorsByPlace]);

  const sensorsInSelectedPlace = selectedPlace
    ? sensorsByPlace[selectedPlace] || []
    : [];

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
            <div className={styles.placeSelector}>
              <div>
                <p className={styles.selectorLabel}>Помещение</p>
                <span className={styles.selectorHint}>
                  Выберите локацию с датчиками
                </span>
              </div>
              <select
                className={styles.placeSelect}
                value={selectedPlace}
                onChange={(event) => setSelectedPlace(event.target.value)}
                disabled={!placeOptions.length || sensorsLoading}
              >
                {placeOptions.length === 0 ? (
                  <option value="">Нет данных</option>
                ) : (
                  placeOptions.map((place) => (
                    <option key={place} value={place}>
                      {place}
                    </option>
                  ))
                )}
              </select>
            </div>

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
              <div className={styles.sensorListHeader}>
                <div>
                  <p>Датчики в помещении</p>
                  <span className={styles.selectedPlaceName}>
                    {selectedPlace || "Не выбрано"}
                  </span>
                </div>
              </div>

              {sensorsError && (
                <p className={styles.errorMessage}>{sensorsError}</p>
              )}

              <div className={styles.sensorCards}>
                {sensorsLoading ? (
                  <p className={styles.placeholderText}>Загрузка...</p>
                ) : sensorsInSelectedPlace.length === 0 ? (
                  <p className={styles.placeholderText}>
                    В этом помещении датчиков нет
                  </p>
                ) : (
                  sensorsInSelectedPlace.map((sensor) => {
                    const status = getSensorStatus(sensor.last_activity);
                    const isOffline = status.text === "Оффлайн";
                    return (
                      <div className={styles.sensorCard} key={sensor._id}>
                        <div className={styles.sensorInfo}>
                          <img
                            src="src/views/assets/images/RFID Signal.png"
                            alt="Датчик"
                          />
                          <div>
                            <p>{sensor.name || "Без названия"}</p>
                            <span>
                              {sensor.serial || sensor._id.slice(-6)}
                            </span>
                          </div>
                        </div>
                        <div className={styles.sensorStatus}>
                          <img
                            src={
                              isOffline
                                ? "src/views/assets/images/Status Offline.png"
                                : "src/views/assets/images/Status Online.png"
                            }
                            alt={isOffline ? "Статус: Оффлайн" : "Статус: Онлайн"}
                          />
                          <span
                            className={
                              isOffline
                                ? styles.statusOffline
                                : styles.statusOnline
                            }
                          >
                            {status.text}
                          </span>
                        </div>
                      </div>
                    );
                  })
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
