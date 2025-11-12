const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const database_route = require("./route/database_route");

require("dotenv").config();

const app = express();
const PORT = 3007;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.post("/api/v1/data", database_route.addSensorMeasurements);
app.get("/api/v1/data", database_route.getSensorMeasurements);
app.get("/api/v1/sensors", database_route.getAllOrganizationSensors);

app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});