import React from "react";
import "./styles/Notification_pc.css";
import NavigationBar from "./components/NavigationBar.jsx";

function Notification() {
  return (
    <div className="body-container">
      <NavigationBar />
      <div className="notification-container">
        <h1>Уведомления</h1>
        <p>Страница находится в разработке</p>
      </div>
    </div>
  );
}

export default Notification;

