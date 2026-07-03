import type { DictionaryEntry } from "../types/dictionary";
import type { SelectionData } from "../types/selection";

import { TooltipRenderer } from "../renderers/TooltipRenderer";

export class TooltipController {
  private readonly renderer = new TooltipRenderer();

  private pinned = false;

  private readonly handleScroll = (): void => {
    if (this.pinned) {
      return;
    }

    this.hide();
  };

  private readonly handleKeyDown = (
    event: KeyboardEvent,
  ): void => {
    if (event.key !== "Escape") {
      return;
    }

    window.getSelection()?.removeAllRanges();

    this.hide();
  };

  private readonly handlePointerDown = (
    event: PointerEvent,
  ): void => {
    const target = event.target;

    if (
      target instanceof Element &&
      this.renderer.contains(target)
    ) {
      return;
    }

    if (this.pinned) {
      return;
    }

    this.hide();
  };

  public constructor() {
    this.renderer.subscribePin(() => {
      this.pinned = !this.pinned;

      this.renderer.setPinned(
        this.pinned,
      );

      console.log(
        `[LoreLens] Tooltip ${
          this.pinned ? "pinned" : "unpinned"
        }.`,
      );
    });

    this.renderer.subscribeClose(() => {
      this.hide();
    });

    window.addEventListener("scroll", this.handleScroll, {
      passive: true,
    });

    document.addEventListener(
      "keydown",
      this.handleKeyDown,
    );

    document.addEventListener(
      "pointerdown",
      this.handlePointerDown,
    );
  }

  public destroy(): void {
    window.removeEventListener(
      "scroll",
      this.handleScroll,
    );

    document.removeEventListener(
      "keydown",
      this.handleKeyDown,
    );

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
    if (this.pinned) {
      return;
    }

    if (selection.isCollapsed || !selection.text) {
      if (!this.pinned) {
        this.hide();
      }

      return;
    }

    this.show(selection, entry);
  }

  private show(
    selection: SelectionData,
    entry?: DictionaryEntry,
  ): void {
    this.renderer.show({
      word: entry?.word ?? selection.text,
      definition: entry?.definition,
      rect: selection.rect,
    });
  }

  private hide(): void {
    this.pinned = false;
    this.renderer.setPinned(false);
    this.renderer.hide();
  }
}