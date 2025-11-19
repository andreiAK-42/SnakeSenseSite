import "./styles/mobile/navigation_bar_mobile.css";
import "./styles/pc/navigation_bar_pc.css";
import { Link, useLocation } from "react-router-dom";

function NavigationBar({ isMenuOpen }) {
  const location = useLocation();

  const navItems = [
    {
      path: "/dashboard",
      label: "Главная",
      icon: "./src/views/assets/images/iMac.png",
    },
    {
      path: "/sensors",
      label: "Датчики",
      icon: "./src/views/assets/images/Laptop Settings.png",
    },
    {
      path: "/notifications",
      label: "Уведомления",
      icon: "./src/views/assets/images/Error.png",
    },
    {
      path: "/api",
      label: "API",
      icon: "./src/views/assets/images/Puzzle Matching.png",
    },
  ];

  return (
    <div className={`menu ${isMenuOpen ? "active" : ""}`}>
      <div className="logo-container">
        <img src="./src/views/assets/images/Rattlesnake.png" alt="Logo" />
        <p>Snake Sense</p>
      </div>

      <div className="points-container">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`point ${location.pathname === item.path ? "active" : ""}`}
          >
            <img src={item.icon} alt={item.label} />
            <p>{item.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NavigationBar;
