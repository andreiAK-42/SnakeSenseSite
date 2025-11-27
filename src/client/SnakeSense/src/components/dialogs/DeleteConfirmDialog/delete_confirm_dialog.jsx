import React from "react";
import styles from './delete_confirm_dialog.module.css';

/**
 * Диалог подтверждения удаления датчика
 */
const DeleteConfirmDialog = ({ sensor, onConfirm, onCancel }) => {
  return (
    <div className={styles.dialogOverlay} onClick={onCancel}>
      <div
        className={styles.dialogContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Подтверждение удаления</h2>
        <p>
          Вы уверены, что хотите удалить датчик <strong>{sensor.name}</strong>?
          Это действие нельзя отменить.
        </p>
        <div className={styles.dialogButtons}>
          <button className={styles.btnCancel} onClick={onCancel}>
            Отмена
          </button>
          <button className={styles.btnDeleteConfirm} onClick={onConfirm}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog;
