import { useState, useEffect, useRef } from "react";

/**
 * Кастомный хук для управления переключением мобильного меню
 * @returns {Object} Объект с состоянием меню и функцией переключения
 */
export const useMenuToggle = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuToggleRef = useRef(null);

  useEffect(() => {
    const menuToggle = menuToggleRef.current || document.querySelector(".menu-toggle");
    
    if (!menuToggle) return;

    const handleToggleClick = (e) => {
      e.stopPropagation();
      setIsMenuOpen((prev) => !prev);
      menuToggle.style.visibility = "hidden";
    };

    const handleDocumentClick = (e) => {
      const menu = document.querySelector(".menu");
      if (
        menu &&
        !menu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        setIsMenuOpen(false);
        menuToggle.style.visibility = "";
      }
    };

    menuToggle.addEventListener("click", handleToggleClick);
    document.addEventListener("click", handleDocumentClick);

    return () => {
      menuToggle.removeEventListener("click", handleToggleClick);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return { isMenuOpen, menuToggleRef };
};
