import {
  TOOLTIP_EDGE_PADDING,
  TOOLTIP_MARGIN,
  TOOLTIP_MAX_HEIGHT,
  TOOLTIP_MIN_HEIGHT,
  TOOLTIP_OFFSET,
  TOOLTIP_SWITCH_THRESHOLD,
} from "../constants/tooltip";
import type { TooltipState } from "../types/tooltip";
import { DefinitionRenderer } from "./DefinitionRenderer";

export class TooltipRenderer {
  private readonly element: HTMLDivElement;

  private readonly definitionRenderer =
    new DefinitionRenderer();

  private onPin?: () => void;

  private onClose?: () => void;

  public constructor() {
    this.element = document.createElement("div");
    this.element.className = "lorelens-tooltip";

    document.body.appendChild(this.element);
  }

  public show(state: TooltipState): void {
    const header = document.createElement("div");
    header.className = "lorelens-tooltip-header";

    const word = document.createElement("div");
    word.className = "lorelens-tooltip-word";
    word.textContent = state.word;

    const actions = document.createElement("div");
    actions.className = "lorelens-tooltip-actions";

    const pinButton = document.createElement("button");
    pinButton.className =
      "lorelens-tooltip-action";
    pinButton.type = "button";
    pinButton.title = "Pin tooltip";
    pinButton.textContent = "📌";

    const closeButton = document.createElement("button");
    closeButton.className =
      "lorelens-tooltip-action";
    closeButton.type = "button";
    closeButton.title = "Close";
    closeButton.textContent = "×";

    pinButton.addEventListener(
      "pointerdown", 
      (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.onPin?.();
    });

    closeButton.addEventListener(
      "pointerdown", 
      (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.onClose?.();
    });

    actions.append(
      pinButton,
      closeButton,
    );

    header.append(
      word,
      actions,
    );

    const definition = document.createElement("div");
    definition.className =
      "lorelens-tooltip-definition";

    definition.innerHTML =
      this.definitionRenderer.render(
        state.definition,
      );
    
    this.element.replaceChildren(
      header,
      definition,
    );

    this.element.style.display = "block";

    const tooltipWidth =
      this.element.offsetWidth;

    const spaceBelow =
      window.innerHeight -
      state.rect.bottom -
      TOOLTIP_MARGIN -
      TOOLTIP_EDGE_PADDING;

    const spaceAbove =
      state.rect.top -
      TOOLTIP_MARGIN -
      TOOLTIP_EDGE_PADDING;

    const showAbove =
      spaceBelow <
        TOOLTIP_SWITCH_THRESHOLD &&
      spaceAbove > spaceBelow;

    const availableHeight = showAbove
      ? spaceAbove
      : spaceBelow;

    const maxHeight = Math.min(
      TOOLTIP_MAX_HEIGHT,
      Math.max(
        TOOLTIP_MIN_HEIGHT,
        availableHeight,
      ),
    );

    this.element.style.maxHeight =
      `${maxHeight}px`;

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

    left = Math.max(
      TOOLTIP_MARGIN,
      left,
    );

    top = Math.max(
      window.scrollY +
        TOOLTIP_MARGIN +
        TOOLTIP_EDGE_PADDING,
      top,
    );

    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;
  }

  public subscribePin(callback: () => void): void {
    this.onPin = callback;
  }

  public subscribeClose(callback: () => void): void {
    this.onClose = callback;
  }

  public setPinned(pinned: boolean): void {
    this.element.classList.toggle(
      "pinned",
      pinned,
    );
  }

  public contains(
    element: Element,
  ): boolean {
    return this.element.contains(element);
  }

  public hide(): void {
    this.element.style.display = "none";
  }

  public destroy(): void {
    this.element.remove();
  }
}