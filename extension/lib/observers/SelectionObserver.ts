import type {
  SelectionData,
  SelectionListener,
} from "../types/selection";

export class SelectionObserver {
  private readonly listeners = new Set<SelectionListener>();

  private isRunning = false;

  public start(): void {
    if (this.isRunning) {
      return;
    }

    document.addEventListener("mouseup", this.handleSelection);
    document.addEventListener("keyup", this.handleSelection);

    this.isRunning = true;
  }

  public stop(): void {
    if (!this.isRunning) {
      return;
    }

    document.removeEventListener("mouseup", this.handleSelection);
    document.removeEventListener("keyup", this.handleSelection);

    this.isRunning = false;
  }

  public subscribe(listener: SelectionListener): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private handleSelection = (): void => {
    const selection = window.getSelection();

    if (!selection) {
      return;
    }

    const text = selection.toString().trim();

    const range =
      selection.rangeCount > 0
        ? selection.getRangeAt(0)
        : document.createRange();

    const rect = range.getBoundingClientRect();

    const data: SelectionData = {
      text,
      selection,
      range,
      rect,
      pageX: rect.left + window.scrollX,
      pageY: rect.bottom + window.scrollY,
      isCollapsed: selection.isCollapsed,
      timestamp: Date.now(),
    };

    this.listeners.forEach((listener) => listener(data));
  };
}