import React from "react";
import styles from "./notifications.module.css";
import NavigationBar from "../components/NavigationBar/navigation_bar.jsx";
import { useMenuToggle } from "../../hooks/useMenuToggle.js";

function Notifications() {
  const { isMenuOpen } = useMenuToggle();
  const [showEmployeeChannelSettingsDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div className={styles.bodyContainer}>
        <button className={styles.menuToggle}>
          <img src="src/views/assets/images/Menu.png" alt="Меню" />
        </button>
        <NavigationBar isMenuOpen={isMenuOpen} />

        <div className={styles.employeeContainer}>
          <div className={styles.employeeActionContainer}>
            <h1>Персонал</h1>
            <button className={styles.btnDeleteConfirm}>
              Добавить
            </button>
          </div>

          <table className={styles.employeeTable}>
            <thead>
              <tr>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>Должность</th>
                <th>Канал связи</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Notifications;
