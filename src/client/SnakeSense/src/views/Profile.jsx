import React from "react";
import "./styles/Profile_pc.css";
import NavigationBar from "./components/NavigationBar.jsx";

function Profile() {
  return (
    <div className="body-container">
      <NavigationBar />
      <div className="profile-container">
        <h1>Профиль</h1>
        <p>Страница находится в разработке</p>
      </div>
    </div>
  );
}

export default Profile;

