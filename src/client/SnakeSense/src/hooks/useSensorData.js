import { useState, useEffect } from "react";
import { fetchSensorData } from "../services/api";

/**
 * Кастомный хук для получения данных измерений датчиков
 * @param {string} dateStart - Начальная дата
 * @param {string} dateEnd - Конечная дата
 * @returns {Object} Объект с данными, состоянием загрузки и ошибкой
 */
export const useSensorData = (dateStart, dateEnd) => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchSensorData(dateStart, dateEnd);

        if (data.length === 0) {
          setError(
            "Не удалось загрузить данные с датчиков. Возможно показаний нет"
          );
        } else {
          setSensorData(data);
        }
      } catch (err) {
        setError("Не удалось загрузить данные с датчиков");
        console.error("Ошибка:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dateStart, dateEnd]);

  return { sensorData, loading, error };
};
