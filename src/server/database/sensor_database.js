const mongoose = require("mongoose");
const Organization = require("./models/Organization");
const Sensor = require("./models/Sensor");
const Measurement = require("./models/Measurement");
require("dotenv").config();

class SensorService {
  constructor() {
    this.isConnected = false;
    this.connect();
  }

  async connect() {
    if (this.isConnected) return;

    try {
      const MONGODB_URI = process.env.MONGODB_URI;
      await mongoose.connect(MONGODB_URI);
      this.isConnected = true;
      console.log("✅ MongoDB connected in SensorService");
    } catch (error) {
      console.error("❌ MongoDB connection error in SensorService:", error);
      throw error;
    }
  }
  async addMeasurement(
    sensorId,
    sensorPassword,
    dhtTemperature,
    dhtHumidity,
    bmpTemperature,
    bmpPressure,
    mqPPM,
    mqBadData
  ) {
    try {
      await this.connect();
      const measurement = new Measurement({
        sensor_id: sensorId,
        time: new Date(),
        data: {
          dht_temperature: dhtTemperature,
          dht_humidity: dhtHumidity,
          bmp_temperature: bmpTemperature,
          bmp_pressure: bmpPressure,
          mq_ppm: mqPPM,
          mq_bad_data: mqBadData,
        },
      });

      await measurement.save();

      await Sensor.findByIdAndUpdate(sensorId, {
        last_activity: new Date(),
      });

      return measurement;
    } catch (error) {
      console.error("❌ Error in addMeasurement:", error);
      throw new Error(`Ошибка сохранения измерения: ${error.message}`);
    }
  }

  async getMeasurement(sensorId, date_start, date_end) {
    try {
      await this.connect();
      const sensor = await Sensor.findOne({ _id: sensorId });
      if (!sensor) {
        throw new Error("Сенсор не найден");
      }

      const startOfDay = new Date(date_start);
      startOfDay.setHours(0, 0, 0, 0); // 00:00:00.000

      const endOfDay = new Date(date_end);
      endOfDay.setDate(endOfDay.getDate() + 1); // Следующий день
      endOfDay.setHours(0, 0, 0, 0); // 00:00:00.000 следующего дня

      const measurements = await Measurement.find(
        {
          sensor_id: sensorId,
          time: { $gte: new Date(startOfDay), $lt: new Date(endOfDay) },
        },
        { time: 1, data: 1 }
      ).sort({ time: 1 });

      return measurements;
    } catch (error) {
      console.error("❌ Error in getMeasurement:", error);
      throw new Error(`Ошибка получения измерений: ${error.message}`);
    }
  }

  async findSensorByIdAndPassword(sensorId, password) {
    try {
      const sensor = await Sensor.findOne({
        _id: sensorId,
        password: password,
      }).populate("organization", "name");

      return sensor;
    } catch (error) {
      console.error("❌ Error in findSensorByIdAndPassword:", error);
      throw new Error(`Ошибка поиска датчика: ${error.message}`);
    }
  }

  async getAllOrganizationSensors(organizationId) {
    try {
      await this.connect();
      const sonsors = await Sensor.find({
        organization: new mongoose.Types.ObjectId(organizationId),
      });

      return sonsors;
    } catch (error) {
      console.error("❌ Error in getAllOrganizationSensors:", error);
      throw new Error(`Ошибка поиска датчика: ${error.message}`);
    }
  }

  async updateSensor(sensorId, updateData) {
    try {
      await this.connect();
      const sensor = await Sensor.findByIdAndUpdate(
        sensorId,
        { $set: updateData },
        { new: true, runValidators: true }
      );

      if (!sensor) {
        throw new Error("Датчик не найден");
      }

      return sensor;
    } catch (error) {
      console.error("❌ Error in updateSensor:", error);
      throw new Error(`Ошибка обновления датчика: ${error.message}`);
    }
  }

  async deleteSensor(sensorId) {
    try {
      await this.connect();
      const sensor = await Sensor.findByIdAndDelete(sensorId);

      if (!sensor) {
        throw new Error("Датчик не найден");
      }

      return sensor;
    } catch (error) {
      console.error("❌ Error in deleteSensor:", error);
      throw new Error(`Ошибка удаления датчика: ${error.message}`);
    }
  }
}

module.exports = new SensorService();
