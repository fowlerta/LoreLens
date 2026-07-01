import type { SelectionData } from "../types/selection";
import { TooltipRenderer } from "../renderers/TooltipRenderer";

export class TooltipController {
  private readonly renderer = new TooltipRenderer();

  public handle(selection: SelectionData): void {
    if (selection.isCollapsed || !selection.text) {
      this.hide();
      return;
    }

    this.show(selection);
  }

  private show(selection: SelectionData): void {
    this.renderer.show({
      visible: true,
      text: selection.text,
      x: selection.pageX,
      y: selection.pageY,
    });
  }

  private hide(): void {
    this.renderer.hide();
  }
}