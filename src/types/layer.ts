
export interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  expanded?: boolean;
  zIndex: number;
  color?: string; // For visual identification
}
