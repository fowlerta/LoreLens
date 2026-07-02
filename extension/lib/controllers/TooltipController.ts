import type { DictionaryEntry } from "../types/dictionary";
import type { SelectionData } from "../types/selection";

import { TooltipRenderer } from "../renderers/TooltipRenderer";

export class TooltipController {
  private readonly renderer = new TooltipRenderer();

  private readonly handleScroll = (): void => {
    this.hide();
  };

  private readonly handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key !== "Escape") {
      return;
    }

    window.getSelection()?.removeAllRanges();

    this.hide();
  };

  private readonly handlePointerDown = (): void => {
    this.hide();
  };

  public constructor() {
    window.addEventListener("scroll", this.handleScroll, {
      passive: true,
    });

    document.addEventListener("keydown", this.handleKeyDown);
    
    document.addEventListener(
      "pointerdown",
      this.handlePointerDown,
    );
  }

  public destroy(): void {
    window.removeEventListener("scroll", this.handleScroll);
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener(
      "pointerdown",
      this.handlePointerDown,
    );

    this.renderer.destroy();
  }

  public handle(
    selection: SelectionData,
    entry?: DictionaryEntry,
  ): void {
    if (selection.isCollapsed || !selection.text) {
      this.hide();
      return;
    }

    this.show(selection, entry);
  }

  private show(
    selection: SelectionData,
    entry?: DictionaryEntry,
  ): void {
    this.renderer.show({
      word: selection.text,
      definition: entry?.definition,
      rect: selection.rect,
    });
  }

  private hide(): void {
    this.renderer.hide();
  }
}