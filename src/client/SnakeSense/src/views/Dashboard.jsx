import React, { useEffect, useState } from "react";
import "./styles/Dashboard_pc.css";
import "./styles/mobile/Dashboard_mobile.css";
import NavigationBar from "./components/NavigationBar.jsx";
import SensorChart from "./components/SensorChart.jsx";
import ParameterCards from "./components/ParameterCards.jsx";
import ChartSettings from "./components/ChartSettings.jsx";

function Dashboard() {
  const [selectedParameter, setSelectedParameter] = useState("temperature");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const menuToggle = document.querySelector(".menu-toggle");

    function closeMenu() {
      setIsMenuOpen(false);
    }

    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      setIsMenuOpen(!isMenuOpen);
      menuToggle.style.visibility = "hidden";
    });

    document.addEventListener("click", (e) => {
      const menu = document.querySelector(".menu");
      if (menu && !menu.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
        menuToggle.style.visibility = "";
      }
    });

    return () => {};
  }, []);

  const fetchSensorData = async () => {
    try {
      setLoading(true);
      setError("");

      const url = `http://127.0.0.1:3007/api/v1/data?date_start=${selectedDate}&date_end=${selectedDate}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Ошибка при получении данных");
      }

      const result = await response.json();
      console.log("Данные с сервера:", result);

      if (result.success) {
        if (result.data.length == 0) {
          setError(
            "Не удалось загрузить данные с датчиков. Возможно показаний нет"
          );
        } else {
          setSensorData(result.data);
        }
      } else {
        throw new Error(result.error || "Ошибка в данных сервера");
      }
    } catch (err) {
      setError("Не удалось загрузить данные с датчиков");
      console.error("Ошибка:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();
  }, [selectedDate]);

  const handleParameterChange = (event) => {
    setSelectedParameter(event.target.value);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <>
      <div className="body-container">
        <button class="menu-toggle">
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
