
export interface CanvasElement {
  type: string;
  id: string;
  x: number;
  y: number;
  content?: string;
  visible?: boolean;
  zIndex?: number;
  width?: string | number;
  height?: string | number;
}
