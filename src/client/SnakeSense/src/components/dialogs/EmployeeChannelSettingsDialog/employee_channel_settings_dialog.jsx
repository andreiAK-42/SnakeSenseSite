import React from "react";
import styles from './sensor_settings_dialog.module.css';

/**
 * Диалог настроек канала связи
 */
const EmployeeChannelSettings = ({
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
    <div className={styles.dialogOverlay} onClick={onCancel}>
      <div
        className={styles.dialogContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Канал : {sensor.name}</h2>
        <form className={styles.settingsForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
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
          <div className={styles.formGroup}>
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
          <div className={styles.formGroup}>
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
          <div className={styles.formGroup}>
            <label>MQ PPM (добавка):</label>
            <input
              type="number"
              value={settingsForm.mq_ppm_add}
              onChange={(e) =>
                handleInputChange("mq_ppm_add", parseFloat(e.target.value) || 0)
              }
            />
          </div>
          <div className={styles.formGroup}>
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
          <div className={styles.formGroup}>
            <label>Местоположение:</label>
            <input
              type="text"
              value={settingsForm.place}
              onChange={(e) =>
                handleInputChange("place", e.target.value || "None")
              }
            />
          </div>
          <div className={styles.dialogButtons}>
            <button type="button" className={styles.btnCancel} onClick={onCancel}>
              Отмена
            </button>
            <button type="submit" className={styles.btnSave}>
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeChannelSettings;
