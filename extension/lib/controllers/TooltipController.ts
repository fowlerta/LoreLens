import type { DictionaryEntry } from "../types/dictionary";
import type { SelectionData } from "../types/selection";

import { TooltipRenderer } from "../renderers/TooltipRenderer";

export class TooltipController {
  private readonly renderer = new TooltipRenderer();

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