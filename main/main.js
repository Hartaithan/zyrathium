const menu = document.createElement("div");
menu.id = "zyr-context-menu";

const item = document.createElement("div");
item.textContent = "Reload";
item.className = "menu-item";
item.addEventListener("click", (ev) => {
  ev.stopPropagation();
  hideMenu();
  window.location.reload();
});

menu.appendChild(item);
document.documentElement.appendChild(menu);

const showMenu = (x, y) => {
  menu.style.display = "block";
  const rect = menu.getBoundingClientRect();
  const winW = window.innerWidth;
  const winH = window.innerHeight;
  let left = x;
  let top = y;
  if (left + rect.width > winW) left = Math.max(8, winW - rect.width - 8);
  if (top + rect.height > winH) top = Math.max(8, winH - rect.height - 8);
  menu.style.left = left + "px";
  menu.style.top = top + "px";
};

const hideMenu = () => {
  menu.style.display = "none";
};

document.addEventListener("contextmenu", (event) => {
  const { clientX, clientY } = event;
  event.preventDefault();
  showMenu(clientX, clientY);
});

document.addEventListener("mousedown", (event) => {
  const { target } = event;
  if (!menu.contains(target)) hideMenu();
});

document.addEventListener("keydown", (event) => {
  const { key } = event;
  if (key === "Escape") hideMenu();
});

window.addEventListener("scroll", hideMenu, true);
window.addEventListener("resize", hideMenu);
