/**
 * Утилиты для форматирования данных
 */

/**
 * Определить статус датчика на основе времени последней активности
 * @param {string|null} lastActivity - Дата и время последней активности
 * @returns {Object} Объект с текстом статуса и классом CSS
 */
export const getSensorStatus = (lastActivity) => {
  if (!lastActivity) {
    return { text: "Неизвестно", class: "status-unknown" };
  }

  const lastActivityDate = new Date(lastActivity);
  const now = new Date();
  const diffMinutes = (now - lastActivityDate) / (1000 * 60);

  if (diffMinutes < 5) {
    return { text: "Онлайн", class: "status-online" };
  } else if (diffMinutes < 60) {
    return { text: "Недавно", class: "status-recent" };
  } else {
    return { text: "Оффлайн", class: "status-offline" };
  }
};

/**
 * Форматировать дату в читаемый формат
 * @param {string|null} dateString - Дата в формате ISO
 * @returns {string} Отформатированная дата
 */
export const formatDate = (dateString) => {
  if (!dateString) return "Никогда";

  const date = new Date(dateString);
  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Получить текущую дату в формате YYYY-MM-DD
 * @returns {string} Текущая дата
 */
export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};
