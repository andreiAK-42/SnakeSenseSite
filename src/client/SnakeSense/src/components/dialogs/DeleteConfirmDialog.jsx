import React from "react";

/**
 * Диалог подтверждения удаления датчика
 */
const DeleteConfirmDialog = ({ sensor, onConfirm, onCancel }) => {
  return (
    <div className="dialog-overlay" onClick={onCancel}>
      <div
        className="dialog-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Подтверждение удаления</h2>
        <p>
          Вы уверены, что хотите удалить датчик <strong>{sensor.name}</strong>?
          Это действие нельзя отменить.
        </p>
        <div className="dialog-buttons">
          <button className="btn-cancel" onClick={onCancel}>
            Отмена
          </button>
          <button className="btn-delete-confirm" onClick={onConfirm}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmDialog;
