import React from "react";
import "./styles/Employee_pc.css";
import NavigationBar from "./components/NavigationBar.jsx";

function Employee() {
  return (
    <div className="body-container">
      <NavigationBar />
      <div className="employee-container">
        <h1>Сотрудники</h1>
        <p>Страница находится в разработке</p>
      </div>
    </div>
  );
}

export default Employee;

