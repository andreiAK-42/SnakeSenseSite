/**
 * API сервис для работы с датчиками и данными измерений
 */

const API_BASE_URL = "http://127.0.0.1:3007/api/v1";

/**
 * Получить данные измерений за указанный период
 * @param {string} dateStart - Начальная дата (формат: YYYY-MM-DD)
 * @param {string} dateEnd - Конечная дата (формат: YYYY-MM-DD)
 * @returns {Promise<Array>} Массив данных измерений
 */
export const fetchSensorData = async (dateStart, dateEnd) => {
  try {
    const url = `${API_BASE_URL}/data?date_start=${dateStart}&date_end=${dateEnd}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Ошибка в данных сервера");
    }

    return result.data || [];
  } catch (error) {
    console.error("Ошибка при загрузке данных датчиков:", error);
    throw error;
  }
};

/**
 * Получить список всех датчиков организации
 * @param {string} organizationId - ID организации
 * @returns {Promise<Array>} Массив датчиков
 */
export const fetchSensors = async (organizationId) => {
  try {
    const url = `${API_BASE_URL}/sensors?organizationId=${organizationId}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Ошибка в данных сервера");
    }

    return result.data || [];
  } catch (error) {
    console.error("Ошибка при загрузке списка датчиков:", error);
    throw error;
  }
};

/**
 * Обновить настройки датчика
 * @param {string} sensorId - ID датчика
 * @param {Object} settings - Объект с настройками
 * @returns {Promise<Object>} Результат обновления
 */
export const updateSensorSettings = async (sensorId, settings) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sensors/${sensorId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ settings }),
    });

    if (!response.ok) {
      throw new Error("Ошибка при сохранении настроек");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Ошибка сохранения");
    }

    return result;
  } catch (error) {
    console.error("Ошибка при сохранении настроек датчика:", error);
    throw error;
  }
};

/**
 * Удалить датчик
 * @param {string} sensorId - ID датчика
 * @returns {Promise<Object>} Результат удаления
 */
export const deleteSensor = async (sensorId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/sensors/${sensorId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Ошибка при удалении датчика");
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || "Ошибка удаления");
    }

    return result;
  } catch (error) {
    console.error("Ошибка при удалении датчика:", error);
    throw error;
  }
};
