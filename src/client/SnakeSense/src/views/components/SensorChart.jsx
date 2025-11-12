import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./styles/sensor_chart.css";

const SensorChart = ({
  selectedParameter,
  selectedDate,
  sensorData,
  loading = false,
  error = "",
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const getChartDataFromSensorData = () => {
    const sortedData = [...sensorData].sort(
      (a, b) => new Date(a.time) - new Date(b.time)
    );

    const dataMap = {
      temperature: {
        label: "Температура (°C)",
        data: sortedData.map((item) => item.data.dht_temperature),
        color: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
      pressure: {
        label: "Давление (мм рт. ст.)",
        data: sortedData.map((item) =>
          Math.round(item.data.bmp_pressure * 0.750062)
        ),
        color: "rgb(82, 42, 173)",
        backgroundColor: "rgba(82, 42, 173, 0.2)",
      },
      humidity: {
        label: "Влажность (%)",
        data: sortedData.map((item) => item.data.dht_humidity),
        color: "rgb(76, 175, 80)",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
      },
      bad_ppm: {
        label: "Концентрация газов - аналог (ppm)",
        data: sortedData.map((item) => item.data.mq_bad_data),
        color: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
      },
    };

    return dataMap[selectedParameter] || dataMap.temperature;
  };

  const getTimeLabels = () => {
    if (!sensorData || sensorData.length === 0) {
      return [
        "00:00",
        "02:00",
        "04:00",
        "06:00",
        "08:00",
        "10:00",
        "12:00",
        "14:00",
        "16:00",
        "18:00",
        "20:00",
        "22:00",
      ];
    }
    return sensorData.map((item) => {
      const date = new Date(item.time);
      return date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    });
  };

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const chartData = getChartDataFromSensorData();
      const timeLabels = getTimeLabels();

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: timeLabels,
          datasets: [
            {
              label: chartData.label,
              data: chartData.data,
              borderColor: chartData.color,
              backgroundColor: chartData.backgroundColor,
              borderWidth: 2,
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                color: "white",
              },
            },
            title: {
              display: true,
              text: `График ${chartData.label} за ${selectedDate}`,
              font: {
                size: 16,
              },
              color: "white",
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
              ticks: {
                color: "white",
              },
            },
            x: {
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
              ticks: {
                color: "white",
              },
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [selectedParameter, selectedDate, sensorData]);

  return (
    <div className="sensor-graph-container">
      {loading && <p>Загрузка данных...</p>}
      {error && (
        <p style={{ color: "red" }}>{"Ошибка загрузки данных " + error}</p>
      )}

      <div className="sensor-graph">
        <canvas
          ref={chartRef}
          style={{ width: "100%", height: "300px" }}
        ></canvas>
      </div>
    </div>
  );
};

export default SensorChart;
