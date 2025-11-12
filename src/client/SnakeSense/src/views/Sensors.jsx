import React, { useEffect, useState } from 'react';
import './styles/Sensors_pc.css';
import NavigationBar from './components/NavigationBar.jsx';

function Sensors() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [settingsForm, setSettingsForm] = useState({
    dht_temperature_add: 0,
    dht_humidity_add: 0,
    bmp_pressure_add: 0,
    mq_ppm_add: 0,
    bmp_temperature_add: 0,
  });

  // Загрузка датчиков с сервера
  const fetchSensors = async () => {
    try {
      setLoading(true);
      setError('');
      // TODO: Заменить на реальный organizationId из контекста/состояния
      const organizationId = '65f8a1b2c3d4e5f6a7b8c9d0'; // Временное значение
      const url = `http://127.0.0.1:3007/api/v1/sensors?organizationId=${organizationId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Ошибка при получении данных');
      }

      const result = await response.json();
      if (result.success) {
        setSensors(result.data || []);
      } else {
        throw new Error(result.error || 'Ошибка в данных сервера');
      }
    } catch (err) {
      setError('Не удалось загрузить список датчиков');
      console.error('Ошибка:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensors();
  }, []);

  // Определение статуса датчика
  const getSensorStatus = (lastActivity) => {
    if (!lastActivity) return { text: 'Неизвестно', class: 'status-unknown' };
    
    const lastActivityDate = new Date(lastActivity);
    const now = new Date();
    const diffMinutes = (now - lastActivityDate) / (1000 * 60);
    
    if (diffMinutes < 5) {
      return { text: 'Онлайн', class: 'status-online' };
    } else if (diffMinutes < 60) {
      return { text: 'Недавно', class: 'status-recent' };
    } else {
      return { text: 'Оффлайн', class: 'status-offline' };
    }
  };

  // Форматирование даты
  const formatDate = (dateString) => {
    if (!dateString) return 'Никогда';
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Открытие диалога настроек
  const handleOpenSettings = (sensor) => {
    setSelectedSensor(sensor);
    setSettingsForm({
      dht_temperature_add: sensor.settings?.dht_temperature_add || 0,
      dht_humidity_add: sensor.settings?.dht_humidity_add || 0,
      bmp_pressure_add: sensor.settings?.bmp_pressure_add || 0,
      mq_ppm_add: sensor.settings?.mq_ppm_add || 0,
      bmp_temperature_add: sensor.settings?.bmp_temperature_add || 0,
    });
    setShowSettingsDialog(true);
  };

  // Сохранение настроек
  const handleSaveSettings = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3007/api/v1/sensors/${selectedSensor._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            settings: settingsForm,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Ошибка при сохранении настроек');
      }

      const result = await response.json();
      if (result.success) {
        setShowSettingsDialog(false);
        fetchSensors(); // Обновляем список
      } else {
        throw new Error(result.error || 'Ошибка сохранения');
      }
    } catch (err) {
      alert('Не удалось сохранить настройки: ' + err.message);
      console.error('Ошибка:', err);
    }
  };

  // Открытие диалога удаления
  const handleOpenDelete = (sensor) => {
    setSelectedSensor(sensor);
    setShowDeleteDialog(true);
  };

  // Подтверждение удаления
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:3007/api/v1/sensors/${selectedSensor._id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Ошибка при удалении датчика');
      }

      const result = await response.json();
      if (result.success) {
        setShowDeleteDialog(false);
        setSelectedSensor(null);
        fetchSensors(); // Обновляем список
      } else {
        throw new Error(result.error || 'Ошибка удаления');
      }
    } catch (err) {
      alert('Не удалось удалить датчик: ' + err.message);
      console.error('Ошибка:', err);
    }
  };

  if (loading) {
    return (
      <div className="body-container">
        <NavigationBar />
        <div className="sensors-container">
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="body-container">
      <NavigationBar />
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
                    <td>{sensor.name || 'Без названия'}</td>
                    <td>{sensor.place || 'Не указано'}</td>
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

        {/* Диалог настроек */}
        {showSettingsDialog && selectedSensor && (
          <div className="dialog-overlay" onClick={() => setShowSettingsDialog(false)}>
            <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
              <h2>Настройки датчика: {selectedSensor.name}</h2>
              <div className="settings-form">
                <div className="form-group">
                  <label>DHT Температура (добавка):</label>
                  <input
                    type="number"
                    value={settingsForm.dht_temperature_add}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        dht_temperature_add: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>DHT Влажность (добавка):</label>
                  <input
                    type="number"
                    value={settingsForm.dht_humidity_add}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        dht_humidity_add: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>BMP Давление (добавка):</label>
                  <input
                    type="number"
                    value={settingsForm.bmp_pressure_add}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        bmp_pressure_add: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>MQ PPM (добавка):</label>
                  <input
                    type="number"
                    value={settingsForm.mq_ppm_add}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        mq_ppm_add: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>BMP Температура (добавка):</label>
                  <input
                    type="number"
                    value={settingsForm.bmp_temperature_add}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        bmp_temperature_add: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>
              <div className="dialog-buttons">
                <button className="btn-cancel" onClick={() => setShowSettingsDialog(false)}>
                  Отмена
                </button>
                <button className="btn-save" onClick={handleSaveSettings}>
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Диалог подтверждения удаления */}
        {showDeleteDialog && selectedSensor && (
          <div className="dialog-overlay" onClick={() => setShowDeleteDialog(false)}>
            <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
              <h2>Подтверждение удаления</h2>
              <p>
                Вы уверены, что хотите удалить датчик <strong>{selectedSensor.name}</strong>?
                Это действие нельзя отменить.
              </p>
              <div className="dialog-buttons">
                <button className="btn-cancel" onClick={() => setShowDeleteDialog(false)}>
                  Отмена
                </button>
                <button className="btn-delete-confirm" onClick={handleConfirmDelete}>
                  Удалить
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sensors;
