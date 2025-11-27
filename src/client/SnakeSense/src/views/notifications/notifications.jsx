import React, { useState } from "react";
import styles from "./notifications.module.css";
import NavigationBar from "../components/NavigationBar/navigation_bar.jsx";
import { useMenuToggle } from "../../hooks/useMenuToggle.js";
import EmployeeChannelPickerDialog from "../../components/dialogs/EmployeeChannelPickerDialog/employee_channel_picker_dialog.jsx";
import EmployeeChannelSettingsDialog from "../../components/dialogs/EmployeeChannelSettingsDialog/employee_channel_settings_dialog.jsx";
import { saveEmployeeNotificationChannel } from "../../services/api.js";

const CHANNELS = [
  {
    id: "telegram",
    title: "Telegram",
    shortName: "TG",
    icon: "TG",
    description: "Бот или личный аккаунт Telegram для срочных уведомлений.",
    accentColor: "#2ca5e0",
    fields: [
      {
        name: "telegramId",
        label: "Telegram ID / username",
        placeholder: "@username или числовой ID",
        type: "text",
      },
    ],
  },
  {
    id: "vk",
    title: "ВКонтакте",
    shortName: "VK",
    icon: "VK",
    description: "Личные сообщения VK или официальное сообщество.",
    accentColor: "#4a76a8",
    fields: [
      {
        name: "vkUserId",
        label: "VK user ID",
        placeholder: "Числовой ID или @screen_name",
        type: "text",
      },
    ],
  },
  {
    id: "email",
    title: "Email",
    shortName: "EM",
    icon: "✉️",
    description: "Стандартные email-уведомления с полной информацией.",
    accentColor: "#f2c94c",
    fields: [
      {
        name: "email",
        label: "Адрес электронной почты",
        placeholder: "name@company.ru",
        type: "email",
      },
    ],
  },
  {
    id: "sms",
    title: "SMS",
    shortName: "SMS",
    icon: "📱",
    description: "Текстовые SMS-сообщения для критических событий.",
    accentColor: "#eb5757",
    fields: [
      {
        name: "phone",
        label: "Номер телефона",
        placeholder: "+7 999 000-00-00",
        type: "tel",
      },
    ],
  },
];

const GENERAL_FORM_STATE = {
  lastName: "",
  firstName: "",
  position: "",
};

const buildFormState = (channel) => {
  if (!channel) {
    return { ...GENERAL_FORM_STATE };
  }

  const specificFields = channel.fields?.reduce(
    (result, field) => ({ ...result, [field.name]: "" }),
    {}
  );

  return { ...GENERAL_FORM_STATE, ...specificFields };
};

function Notifications() {
  const { isMenuOpen } = useMenuToggle();
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [channelForm, setChannelForm] = useState({ ...GENERAL_FORM_STATE });
  const [isSavingChannel, setIsSavingChannel] = useState(false);
  const [channelError, setChannelError] = useState("");

  const openPicker = () => {
    setChannelError("");
    setPickerOpen(true);
  };

  const closePicker = () => setPickerOpen(false);

  const handleChannelSelect = (channel) => {
    setSelectedChannel(channel);
    setChannelForm(buildFormState(channel));
    setPickerOpen(false);
  };

  const handleChannelFormChange = (field, value) => {
    setChannelForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveChannel = async () => {
    if (!selectedChannel) {
      return;
    }

    setIsSavingChannel(true);
    setChannelError("");

    try {
      await saveEmployeeNotificationChannel({
        channel: selectedChannel.id,
        ...channelForm,
      });
      setSelectedChannel(null);
    } catch (error) {
      setChannelError("Не удалось сохранить канал. Попробуйте еще раз.");
    } finally {
      setIsSavingChannel(false);
    }
  };

  const handleCloseSettings = () => {
    setSelectedChannel(null);
    setChannelForm({ ...GENERAL_FORM_STATE });
    setChannelError("");
  };

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
            <button onClick={openPicker}>Добавить</button>
          </div>

          {channelError && (
            <p className={styles.errorMessage}>{channelError}</p>
          )}

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

      {isPickerOpen && (
        <EmployeeChannelPickerDialog
          channels={CHANNELS}
          onSelect={handleChannelSelect}
          onClose={closePicker}
        />
      )}

      {selectedChannel && (
        <EmployeeChannelSettingsDialog
          channel={selectedChannel}
          formValues={channelForm}
          onChange={handleChannelFormChange}
          onSave={handleSaveChannel}
          onCancel={handleCloseSettings}
          isSaving={isSavingChannel}
        />
      )}
    </>
  );
}

export default Notifications;
