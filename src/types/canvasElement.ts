
export interface NFTData {
  name?: string;
  image?: string;
  collection?: string;
  marketplaceLink?: string;
  blurAmount?: number;
  glowColor?: string;
  glowSpread?: number;
  rotation?: number;
  scale?: number;
  width?: number;
  height?: number;
}

export interface CanvasElement {
  type: string;
  id: string;
  x: number;
  y: number;
  content?: string;
  description?: string;
  visible?: boolean;
  zIndex?: number;
  nftData?: NFTData;
  templateSection?: string; // Field for template sections
  backgroundType?: 'color' | 'gradient' | 'image'; // Field for background type
  backgroundValue?: string; // Field for background value (color code, gradient string, or image URL)
  blurAmount?: number; // Field for blur effect
  opacity?: number; // Field for opacity (0-100)
  enable3D?: boolean; // Field for 3D effect toggle
  layerId?: string; // Field for layer assignment
  locked?: boolean; // Field to lock elements
  rotation?: number; // Field for rotation
  width?: number; // Field for width
  height?: number; // Field for height
  scale?: number; // Field for scale
  isNew?: boolean; // Flag for newly added elements
}
