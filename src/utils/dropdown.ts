interface CreateItemParams {
  label: string;
  onClick: () => void;
  menu: HTMLDivElement;
  hideMenu: () => void;
}

export const createDropdownItem = (params: CreateItemParams) => {
  const { label, onClick, menu, hideMenu } = params;

  const item = document.createElement("div");
  item.textContent = label;
  item.className = "menu-item";
  item.addEventListener("click", (event) => {
    event.stopPropagation();
    hideMenu();
    onClick();
  });

  menu.appendChild(item);
};
