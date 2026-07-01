export interface SelectionData {
  text: string;
  selection: Selection;
  range: Range;
  rect: DOMRect;

  pageX: number;
  pageY: number;

  isCollapsed: boolean;
  timestamp: number;
}