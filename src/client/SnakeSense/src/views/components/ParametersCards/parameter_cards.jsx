import React from 'react';
import styles from './parameter_cards.module.css';

const ParameterCards = ({ sensorData }) => {
  
  const getLatestValues = () => {
    if (!sensorData || sensorData.length === 0) {
      return {
        temperature: 0,
        humidity: 0,
        pressure: 0,
        ppm: 0
      };
    }

    const latestData = sensorData[sensorData.length - 1];
    return {
      temperature: latestData.data.dht_temperature,
      humidity: latestData.data.dht_humidity,
      pressure: Math.round(latestData.data.bmp_pressure / 133.3),
      ppm: latestData.data.mq_au
    };
  };

  const latestValues = getLatestValues();

  return (
    <div className={styles.currentParameterCardsContainer}>
      <div className={styles.currentParameterCard}>
        <p>Температура</p>
        <div className={styles.cardIconsAndParameter}>
          <img
            src="./src/views/assets/images/Temperature.png"
            alt="Температура"
          />
          <p>{latestValues.temperature} °C</p>
        </div>
        <p>{latestValues.temperature < 20 ? "Прохладно" : "В норме"}</p>
      </div>

      <div
        className={styles.currentParameterCard}
        style={{ backgroundColor: "#4CAF50" }}
      >
        <p>Влажность</p>
        <div className={styles.cardIconsAndParameter}>
          <img
            src="./src/views/assets/images/Drop of Blood.png"
            alt="Влажность"
          />
          <p>{latestValues.humidity} %</p>
        </div>
        <p>В норме</p>
      </div>

      <div
        className={styles.currentParameterCard}
        style={{ backgroundColor: "#522AAD" }}
      >
        <p>Давление</p>
        <div className={styles.cardIconsAndParameter}>
          <img
            src="./src/views/assets/images/Pressure Gauge.png"
            alt="Давление"
          />
          <p>{latestValues.pressure} мм</p>
        </div>
        <p>В норме</p>
      </div>

      <div
        className={styles.currentParameterCard}
        style={{ backgroundColor: "#4CAF50" }}
      >
        <p>Концентрация газов</p>
        <div className={styles.cardIconsAndParameter}>
          <img src="./src/views/assets/images/Sulfates.png" alt="Газы" />
          <p>{latestValues.ppm} AU</p>
        </div>
        <p>В норме</p>
      </div>
    </div>
  );
};

export default ParameterCards;