import type { TooltipState } from "../types/tooltip";

export class TooltipRenderer {
  private readonly element: HTMLDivElement;

  public constructor() {
    this.element = document.createElement("div");

    this.element.style.position = "absolute";
    this.element.style.display = "none";

    this.element.style.background = "#ffffff";
    this.element.style.color = "#000000";

    this.element.style.border = "1px solid #d0d0d0";
    this.element.style.borderRadius = "8px";

    this.element.style.padding = "10px 14px";

    this.element.style.boxShadow =
      "0 6px 20px rgba(0,0,0,0.15)";

    this.element.style.fontFamily = "sans-serif";
    this.element.style.fontSize = "14px";

    this.element.style.zIndex = "2147483647";

    document.body.appendChild(this.element);
  }

  public show(state: TooltipState): void {
    this.element.textContent = `Loading "${state.text}"...`;

    this.element.style.left = `${state.x}px`;
    this.element.style.top = `${state.y + 8}px`;

    this.element.style.display = "block";
  }

  public hide(): void {
    this.element.style.display = "none";
  }

  public destroy(): void {
    this.element.remove();
  }
}