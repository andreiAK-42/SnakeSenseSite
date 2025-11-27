import React from "react";
import styles from "./employee_channel_settings_dialog.module.css";

/**
 * Диалог настройки конкретного канала связи
 */
const EmployeeChannelSettingsDialog = ({
  channel,
  formValues,
  onChange,
  onSave,
  onCancel,
  isSaving = false,
}) => {
  if (!channel) {
    return null;
  }

  const handleInputChange = (field) => (event) => {
    if (!onChange) {
      return;
    }
    onChange(field, event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSave) {
      onSave();
    }
  };

  return (
    <div className={styles.dialogOverlay} onClick={onCancel}>
      <div
        className={styles.dialogContent}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.dialogHeader}>
          <span
            className={styles.channelIcon}
            style={{ backgroundColor: channel.accentColor }}
          >
            {channel.icon || channel.shortName}
          </span>
          <div>
            <h2>{channel.title}</h2>
            <p>{channel.description}</p>
          </div>
        </div>

        <form className={styles.settingsForm} onSubmit={handleSubmit}>
          <div className={styles.section}>
            <h3>Общие данные</h3>
            <div className={styles.formGroup}>
              <label htmlFor="lastName">Фамилия</label>
              <input
                id="lastName"
                type="text"
                placeholder="Иванов"
                value={formValues.lastName || ""}
                onChange={handleInputChange("lastName")}
                autoFocus
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="firstName">Имя</label>
              <input
                id="firstName"
                type="text"
                placeholder="Иван"
                value={formValues.firstName || ""}
                onChange={handleInputChange("firstName")}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="position">Должность</label>
              <input
                id="position"
                type="text"
                placeholder="Дежурный оператор"
                value={formValues.position || ""}
                onChange={handleInputChange("position")}
              />
            </div>
          </div>

          {channel.fields?.length ? (
            <div className={styles.section}>
              <h3>Настройки {channel.shortName || channel.title}</h3>
              {channel.fields.map((field) => (
                <div className={styles.formGroup} key={field.name}>
                  <label htmlFor={field.name}>{field.label}</label>
                  <input
                    id={field.name}
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    value={formValues[field.name] || ""}
                    onChange={handleInputChange(field.name)}
                  />
                </div>
              ))}
            </div>
          ) : null}

          <div className={styles.dialogButtons}>
            <button
              type="button"
              className={styles.btnCancel}
              onClick={onCancel}
              disabled={isSaving}
            >
              Отмена
            </button>
            <button
              type="submit"
              className={styles.btnSave}
              disabled={isSaving}
            >
              {isSaving ? "Сохранение..." : "Сохранить"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeChannelSettingsDialog;
