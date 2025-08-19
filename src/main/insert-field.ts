export const insertFieldIds = {
  field: "zyr-insert-field",
  container: "zyr-insert-container",
};

export class InsertField {
  private container: HTMLDivElement;
  private textarea: HTMLTextAreaElement;
  private content: string = "";
  private isVisible = false;

  constructor() {
    this.container = document.createElement("div");
    this.container.id = insertFieldIds.container;

    this.textarea = document.createElement("textarea");
    this.textarea.id = insertFieldIds.field;
    this.textarea.placeholder = "Enter your art...";
    this.textarea.addEventListener("keydown", (e) => e.stopPropagation());
    this.container.appendChild(this.textarea);

    this.setupEventListeners();

    document.documentElement.appendChild(this.container);
  }

  public show() {
    this.container.style.display = "flex";
    this.isVisible = true;
  }

  public hide() {
    this.container.style.display = "none";
    this.isVisible = false;
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
  };
}
