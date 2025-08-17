export const insertFieldIds = {
  field: "zyr-insert-field",
  container: "zyr-insert-container",
};

export class InsertField {
  private container: HTMLDivElement;
  private textarea: HTMLTextAreaElement;
  private isVisible = false;

  constructor() {
    this.container = document.createElement("div");
    this.container.id = insertFieldIds.container;

    this.textarea = document.createElement("textarea");
    this.textarea.id = insertFieldIds.field;
    this.textarea.placeholder = "Enter your art...";
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

  public destroy() {
    this.removeEventListeners();
    if (!this.container.parentNode) return;
    this.container.parentNode.removeChild(this.container);
  }

  private setupEventListeners() {
    // TODO: add textarea listener
  }

  private removeEventListeners() {
    // TODO: add textarea listener
  }
}
