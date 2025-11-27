import React from "react";
import styles from "./employee_channel_picker_dialog.module.css";

const EmployeeChannelPickerDialog = ({ channels = [], onSelect, onClose }) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSelect = (channel) => {
    if (onSelect) {
      onSelect(channel);
    }
  };

  if (!channels.length) {
    return null;
  }

  return (
    <div className={styles.dialogOverlay} onClick={handleClose}>
      <div
        className={styles.dialogContent}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.dialogHeader}>
          <h2>Выберите канал связи</h2>
          <p>Настройте сотруднику подходящий канал доставки уведомлений.</p>
        </div>

        <div className={styles.channelGrid}>
          {channels.map((channel) => (
            <button
              type="button"
              key={channel.id}
              className={styles.channelCard}
              onClick={() => handleSelect(channel)}
            >
              <span
                className={styles.channelIcon}
                style={{ backgroundColor: channel.accentColor }}
              >
                {channel.icon || channel.shortName}
              </span>
              <span className={styles.channelName}>{channel.title}</span>
              <span className={styles.channelDescription}>
                {channel.description}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.dialogFooter}>
          <button
            type="button"
            className={styles.btnCancel}
            onClick={handleClose}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeChannelPickerDialog;
