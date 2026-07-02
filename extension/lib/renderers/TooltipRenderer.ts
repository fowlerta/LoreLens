import {
  TOOLTIP_MARGIN,
  TOOLTIP_OFFSET,
} from "../constants/tooltip";
import type { TooltipState } from "../types/tooltip";

export class TooltipRenderer {
  private readonly element: HTMLDivElement;

  public constructor() {
    this.element = document.createElement("div");

    this.element.className = "lorelens-tooltip";

    document.body.appendChild(this.element);
  }

  public show(state: TooltipState): void {
    const word = document.createElement("div");
    word.className = "lorelens-tooltip-word";
    word.textContent = state.word;

    const definition = document.createElement("div");
    definition.className = "lorelens-tooltip-definition";
    definition.textContent =
      state.definition ?? "No definition found.";

    this.element.replaceChildren(word, definition);

    // Сначала показываем элемент, чтобы узнать его реальные размеры
    this.element.style.display = "block";

    const tooltipWidth = this.element.offsetWidth;
    const tooltipHeight = this.element.offsetHeight;

    let left = state.rect.left + window.scrollX;
    let top = state.rect.bottom + window.scrollY + TOOLTIP_OFFSET;

    // Не выходим за правый край окна
    if (left + tooltipWidth > window.innerWidth - TOOLTIP_MARGIN) {
      left = window.innerWidth - tooltipWidth - TOOLTIP_MARGIN;
    }

    // Если снизу нет места — показываем сверху
    if (top + tooltipHeight > window.innerHeight + window.scrollY) {
      top =
        state.rect.top +
        window.scrollY -
        tooltipHeight -
        TOOLTIP_OFFSET;
    }

    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }

  public hide(): void {
    this.element.style.display = "none";
  }

  public destroy(): void {
    this.element.remove();
  }
}