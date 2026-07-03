import {
  TOOLTIP_MARGIN,
  TOOLTIP_OFFSET,
  TOOLTIP_MIN_HEIGHT,
  TOOLTIP_MAX_HEIGHT,
  TOOLTIP_SWITCH_THRESHOLD,
  TOOLTIP_EDGE_PADDING,
} from "../constants/tooltip";
import type { TooltipState } from "../types/tooltip";
import { DefinitionRenderer } from "./DefinitionRenderer";


export class TooltipRenderer {
  private readonly element: HTMLDivElement;
  private readonly definitionRenderer = new DefinitionRenderer();

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

    definition.innerHTML =
      this.definitionRenderer.render(
        state.definition,
      );

    this.element.replaceChildren(word, definition);

    this.element.style.display = "block";

    const tooltipWidth = this.element.offsetWidth;

    const spaceBelow =
      window.innerHeight -
      state.rect.bottom -
      TOOLTIP_MARGIN -
      TOOLTIP_EDGE_PADDING;

    const spaceAbove =
      state.rect.top -
      TOOLTIP_MARGIN -
      TOOLTIP_EDGE_PADDING;

    // Если снизу мало места и сверху больше — показываем сверху
    const showAbove =
      spaceBelow < TOOLTIP_SWITCH_THRESHOLD &&
      spaceAbove > spaceBelow;

    const availableHeight = showAbove
      ? spaceAbove
      : spaceBelow;

    // Минимум 200px, максимум 420px
    const maxHeight = Math.min(
      TOOLTIP_MAX_HEIGHT,
      Math.max(TOOLTIP_MIN_HEIGHT, availableHeight),
    );

    this.element.style.maxHeight =
      `${maxHeight}px`;

    // После установки maxHeight высота изменилась
    const tooltipHeight =
      this.element.offsetHeight;

    let left =
      state.rect.left + window.scrollX;

    let top = showAbove
      ? state.rect.top +
        window.scrollY -
        tooltipHeight -
        TOOLTIP_OFFSET
      : state.rect.bottom +
        window.scrollY +
        TOOLTIP_OFFSET;

    // Не выходим за правый край
    if (
      left + tooltipWidth >
      window.innerWidth -
        TOOLTIP_MARGIN
    ) {
      left =
        window.innerWidth -
        tooltipWidth -
        TOOLTIP_MARGIN;
    }

    // Не выходим за левый край
    left = Math.max(
      TOOLTIP_MARGIN,
      left,
    );

    // Не выходим за верхний край
    top = Math.max(
      window.scrollY + TOOLTIP_MARGIN + TOOLTIP_EDGE_PADDING,
      top,
    );

    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  } 

  public contains(element: Element): boolean {
    return this.element.contains(element);
  }

  public hide(): void {
    this.element.style.display = "none";
  }

  public destroy(): void {
    this.element.remove();
  }
}