export const contextMenuId = "zyr-context-menu";

interface AddItemParams {
  label: string;
  onClick: () => void;
}

export class ContextMenu {
  private menu: HTMLDivElement;
  private isVisible = false;

  constructor(id: string = contextMenuId) {
    this.menu = document.createElement("div");
    this.menu.id = id;
    this.setupEventListeners();
    document.documentElement.appendChild(this.menu);
  }

  public show(x: number, y: number): void {
    this.menu.style.display = "block";
    this.isVisible = true;

    const rect = this.menu.getBoundingClientRect();
    const winW = window.innerWidth;
    const winH = window.innerHeight;

    let left = x;
    let top = y;

    if (left + rect.width > winW) left = Math.max(8, winW - rect.width - 8);
    if (top + rect.height > winH) top = Math.max(8, winH - rect.height - 8);

    this.menu.style.left = left + "px";
    this.menu.style.top = top + "px";
  }

  public hide(): void {
    this.menu.style.display = "none";
    this.isVisible = false;
  }

  public addItem(params: AddItemParams): void {
    const { label, onClick } = params;

    const item = document.createElement("div");
    item.textContent = label;
    item.className = "menu-item";
    item.addEventListener("click", (event) => {
      event.stopPropagation();
      this.hide();
      onClick();
    });

    this.menu.appendChild(item);
  }

  public getElement(): HTMLDivElement {
    return this.menu;
  }

  public getVisible(): boolean {
    return this.isVisible;
  }

  public destroy() {
    this.removeEventListeners();
    if (this.menu.parentNode) this.menu.parentNode.removeChild(this.menu);
  }

  private isInteractive(target: EventTarget | null) {
    const element = target as HTMLElement;
    const match = "a, button, input, select, textarea, video, audio";
    return element.matches(match);
  }

  private setupEventListeners() {
    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);

    document.addEventListener("contextmenu", this.handleContextMenu);
    document.addEventListener("mousedown", this.handleMouseDown);
    document.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("scroll", this.handleScroll, true);
    window.addEventListener("resize", this.handleResize);
  }

  private removeEventListeners() {
    document.removeEventListener("contextmenu", this.handleContextMenu);
    document.removeEventListener("mousedown", this.handleMouseDown);
    document.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("scroll", this.handleScroll, true);
    window.removeEventListener("resize", this.handleResize);
  }

  private handleContextMenu = (event: MouseEvent) => {
    const { clientX, clientY, target } = event;
    if (this.isInteractive(target)) return;
    event.preventDefault();
    this.show(clientX, clientY);
  };

  private handleMouseDown = (event: MouseEvent) => {
    const { target } = event;
    if (!(target instanceof Node)) return;
    if (!this.menu.contains(target)) this.hide();
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    if (key === "Escape") this.hide();
  };

  private handleScroll = () => this.hide();

  private handleResize = () => this.hide();
}
