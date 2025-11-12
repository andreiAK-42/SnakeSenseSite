const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  dht_temperature_add: { type: Number, default: 0 },
  dht_humidity_add: { type: Number, default: 0 },
  bmp_pressure_add: { type: Number, default: 0 },
  mq_ppm_add: { type: Number, default: 0 },
  bmp_temperature_add: { type: Number, default: 0 },
});

const sensorSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    password: { type: String, required: true },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    place: { type: String, required: false },
    name: { type: String, required: true },
    settings: { type: settingsSchema, default: {} },
    last_activity: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Sensor", sensorSchema);
