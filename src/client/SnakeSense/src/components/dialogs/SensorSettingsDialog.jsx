import React from "react";

/**
 * Диалог настроек датчика
 */
const SensorSettingsDialog = ({
  sensor,
  settingsForm,
  onSettingsChange,
  onSave,
  onCancel,
}) => {
  const handleInputChange = (field, value) => {
    onSettingsChange({
      ...settingsForm,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
  };

  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div
        className="dialog-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Настройки датчика: {sensor.name}</h2>
        <form className="settings-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>DHT Температура (добавка):</label>
            <input
              type="number"
              value={settingsForm.dht_temperature_add}
              onChange={(e) =>
                handleInputChange(
                  "dht_temperature_add",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>
          <div className="form-group">
            <label>DHT Влажность (добавка):</label>
            <input
              type="number"
              value={settingsForm.dht_humidity_add}
              onChange={(e) =>
                handleInputChange(
                  "dht_humidity_add",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>
          <div className="form-group">
            <label>BMP Давление (добавка):</label>
            <input
              type="number"
              value={settingsForm.bmp_pressure_add}
              onChange={(e) =>
                handleInputChange(
                  "bmp_pressure_add",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>
          <div className="form-group">
            <label>MQ PPM (добавка):</label>
            <input
              type="number"
              value={settingsForm.mq_ppm_add}
              onChange={(e) =>
                handleInputChange("mq_ppm_add", parseFloat(e.target.value) || 0)
              }
            />
          </div>
          <div className="form-group">
            <label>BMP Температура (добавка):</label>
            <input
              type="number"
              value={settingsForm.bmp_temperature_add}
              onChange={(e) =>
                handleInputChange(
                  "bmp_temperature_add",
                  parseFloat(e.target.value) || 0
                )
              }
            />
          </div>
          <div className="form-group">
            <label>Местоположение:</label>
            <input
              type="text"
              value={settingsForm.place}
              onChange={(e) =>
                handleInputChange("place", e.target.value || "None")
              }
            />
          </div>
          <div className="dialog-buttons">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Отмена
            </button>
            <button type="submit" className="btn-save">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SensorSettingsDialog;
