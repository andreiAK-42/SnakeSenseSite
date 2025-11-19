/*const menuToggle = document.querySelector(".menu-toggle");
const rightMenuToggle = document.querySelector(".right-menu-toggle");
const menu = document.querySelector(".menu");
const rightContainer = document.querySelector(".right-container");
const overlay = document.querySelector(".overlay");

function closeAllMenus() {
  menu.classList.remove("active");
  rightContainer.classList.remove("active");
  overlay.classList.remove("active");
}

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  menu.classList.toggle("active");
  rightContainer.classList.remove("active");
  overlay.classList.toggle("active");
});

rightMenuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  rightContainer.classList.toggle("active");
  menu.classList.remove("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", closeAllMenus);

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !rightContainer.contains(e.target)) {
    closeAllMenus();
  }
});*/
