import styles from "./navigation_bar.module.css";
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
    }
  ];

  return (
    <div className={`${styles.menu} ${isMenuOpen ? "active" : ""}`}>
      <div className={styles.logoContainer}>
        <img src="./src/views/assets/images/Rattlesnake.png" alt="Logo" />
        <p>Snake Sense</p>
      </div>

      <div className={styles.pointsContainer}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.point} ${location.pathname === item.path ? styles.pointActive : ""}`}
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
