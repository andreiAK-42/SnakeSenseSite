const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const database_route = require("./route/database_route");
const employee_route = require("./route/employee_route");
const profile_route = require("./route/profile_route");
const api_route = require("./route/api_route");
const notification_route = require("./route/notification_route");

require("dotenv").config();

const app = express();
const PORT = 3007;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Database routes
app.post("/api/v1/data", database_route.addSensorMeasurements);
app.get("/api/v1/data", database_route.getSensorMeasurements);
app.get("/api/v1/sensors", database_route.getAllOrganizationSensors);
app.put("/api/v1/sensors/:id", database_route.updateSensor);
app.delete("/api/v1/sensors/:id", database_route.deleteSensor);

// Employee routes
app.get("/api/v1/employees", employee_route.getEmployees);
app.get("/api/v1/employees/:id", employee_route.getEmployeeById);
app.post("/api/v1/employees", employee_route.createEmployee);
app.put("/api/v1/employees/:id", employee_route.updateEmployee);
app.delete("/api/v1/employees/:id", employee_route.deleteEmployee);

// Profile routes
app.get("/api/v1/profile", profile_route.getProfile);
app.put("/api/v1/profile", profile_route.updateProfile);
app.post("/api/v1/profile/change-password", profile_route.changePassword);

// API routes
app.get("/api/v1/api-keys", api_route.getApiKeys);
app.post("/api/v1/api-keys", api_route.createApiKey);
app.delete("/api/v1/api-keys/:id", api_route.revokeApiKey);

// Notification routes
app.get("/api/v1/notifications", notification_route.getNotifications);
app.get("/api/v1/notifications/:id", notification_route.getNotificationById);
app.put("/api/v1/notifications/:id/read", notification_route.markAsRead);
app.put("/api/v1/notifications/read-all", notification_route.markAllAsRead);
app.delete("/api/v1/notifications/:id", notification_route.deleteNotification);

app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});