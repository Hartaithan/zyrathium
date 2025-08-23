export const insertFieldIds = {
  field: "zyr-insert-field",
  container: "zyr-insert-container",
  hide: "zyr-insert-hide-button",
  storage: "zyr-insert-content",
};

export class InsertField {
  private container: HTMLDivElement;
  private textarea: HTMLTextAreaElement;
  private button: HTMLButtonElement;
  private content: string = "";
  private isVisible = true;

  constructor() {
    this.container = document.createElement("div");
    this.container.id = insertFieldIds.container;

    this.button = document.createElement("button");
    this.button.id = insertFieldIds.hide;
    this.button.textContent = "Hide";
    this.button.addEventListener("click", () => this.toggle());
    this.container.appendChild(this.button);

    this.textarea = document.createElement("textarea");
    this.textarea.id = insertFieldIds.field;
    this.textarea.placeholder = "Enter your art...";
    this.textarea.addEventListener("keydown", (e) => e.stopPropagation());
    this.container.appendChild(this.textarea);

    this.content = localStorage.getItem(insertFieldIds.storage) || "";
    this.textarea.value = this.content;

    this.setupEventListeners();

    document.documentElement.appendChild(this.container);
  }

  public toggle() {
    if (this.isVisible) this.hide();
    else this.show();
  }

  public show() {
    this.textarea.style.display = "inline-block";
    this.isVisible = true;
    this.button.textContent = "Hide";
  }

  public hide() {
    this.textarea.style.display = "none";
    this.isVisible = false;
    this.button.textContent = "Show insert field";
  }

  public getVisible(): boolean {
    return this.isVisible;
  }

  public getContent(): string {
    return this.content;
  }

  public destroy() {
    this.removeEventListeners();
    if (!this.container.parentNode) return;
    this.container.parentNode.removeChild(this.container);
  }

  private setupEventListeners() {
    this.handleOnChange = this.handleOnChange.bind(this);
    this.textarea.addEventListener("input", this.handleOnChange);
  }

  private removeEventListeners() {
    this.textarea.removeEventListener("input", this.handleOnChange);
  }

  private handleOnChange = (event: Event) => {
    event.stopPropagation();
    const target = event.target as HTMLTextAreaElement;
    const { value } = target;
    this.content = value;
    localStorage.setItem(insertFieldIds.storage, value);
  };
}
