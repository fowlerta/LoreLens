export interface SelectionData {
  text: string;
  selection: Selection;
  range: Range;
  rect: DOMRect;
  isCollapsed: boolean;
  timestamp: number;
}

export type SelectionListener = (data: SelectionData) => void;