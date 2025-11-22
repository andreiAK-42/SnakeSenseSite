import React, { useEffect, useState } from "react";
import "./styles/Sensors_pc.css";
import "./styles/mobile/sensors_mobile.css";
import NavigationBar from "./components/NavigationBar.jsx";
import SensorSettingsDialog from "../components/dialogs/SensorSettingsDialog.jsx";
import DeleteConfirmDialog from "../components/dialogs/DeleteConfirmDialog.jsx";
import {
  fetchSensors,
  updateSensorSettings,
  deleteSensor,
} from "../services/api";
import { getSensorStatus, formatDate } from "../utils/formatters";
import { useMenuToggle } from "../hooks/useMenuToggle";

const ORGANIZATION_ID = "690181989755625641265a4f";

function Sensors() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isMenuOpen } = useMenuToggle();
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [settingsForm, setSettingsForm] = useState({
    dht_temperature_add: 0,
    dht_humidity_add: 0,
    bmp_pressure_add: 0,
    mq_ppm_add: 0,
    bmp_temperature_add: 0,
    place: "None",
  });

  const loadSensors = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchSensors(ORGANIZATION_ID);
      setSensors(data);
    } catch (err) {
      setError("Не удалось загрузить список датчиков");
      console.error("Ошибка:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSensors();
  }, []);

  const handleOpenSettings = (sensor) => {
    setSelectedSensor(sensor);
    setSettingsForm({
      dht_temperature_add: sensor.settings?.dht_temperature_add || 0,
      dht_humidity_add: sensor.settings?.dht_humidity_add || 0,
      bmp_pressure_add: sensor.settings?.bmp_pressure_add || 0,
      mq_ppm_add: sensor.settings?.mq_ppm_add || 0,
      bmp_temperature_add: sensor.settings?.bmp_temperature_add || 0,
      place: sensor.settings?.place || "None",
    });
    setShowSettingsDialog(true);
  };

  const handleSaveSettings = async () => {
    try {
      await updateSensorSettings(selectedSensor._id, settingsForm);
      setShowSettingsDialog(false);
      loadSensors();
    } catch (err) {
      alert("Не удалось сохранить настройки: " + err.message);
    }
  };

  const handleOpenDelete = (sensor) => {
    setSelectedSensor(sensor);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteSensor(selectedSensor._id);
      setShowDeleteDialog(false);
      setSelectedSensor(null);
      loadSensors();
    } catch (err) {
      alert("Не удалось удалить датчик: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="body-container">
        <button className="menu-toggle">
          <img src="src/views/assets/images/Menu.png" alt="Меню" />
        </button>
        <NavigationBar isMenuOpen={isMenuOpen} />
        <div className="sensors-container">
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="body-container">
      <button className="menu-toggle">
        <img src="src/views/assets/images/Menu.png" alt="Меню" />
      </button>
      <NavigationBar isMenuOpen={isMenuOpen} />
      <div className="sensors-container">
        <h1>Датчики</h1>

        {error && <p className="error-message">{error}</p>}

        <table className="sensors-table">
          <thead>
            <tr>
              <th>Название</th>
              <th>Местоположение</th>
              <th>Статус</th>
              <th>Последняя связь</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {sensors.length === 0 ? (
              <tr>
                <td colSpan="5" className="empty-message">
                  Нет доступных датчиков
                </td>
              </tr>
            ) : (
              sensors.map((sensor) => {
                const status = getSensorStatus(sensor.last_activity);
                return (
                  <tr key={sensor._id}>
                    <td>{sensor.name || "Без названия"}</td>
                    <td>{sensor.settings.place || "Не указано"}</td>
                    <td>
                      <span className={`status-badge ${status.class}`}>
                        {status.text}
                      </span>
                    </td>
                    <td>{formatDate(sensor.last_activity)}</td>
                    <td className="actions-cell">
                      <button
                        className="btn-settings"
                        onClick={() => handleOpenSettings(sensor)}
                      >
                        Настройка
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleOpenDelete(sensor)}
                      >
                        Удалить
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {showSettingsDialog && selectedSensor && (
          <SensorSettingsDialog
            sensor={selectedSensor}
            settingsForm={settingsForm}
            onSettingsChange={setSettingsForm}
            onSave={handleSaveSettings}
            onCancel={() => setShowSettingsDialog(false)}
          />
        )}

        {showDeleteDialog && selectedSensor && (
          <DeleteConfirmDialog
            sensor={selectedSensor}
            onConfirm={handleConfirmDelete}
            onCancel={() => setShowDeleteDialog(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Sensors;
