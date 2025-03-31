
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
  visible?: boolean;
  zIndex?: number;
  nftData?: NFTData;
  templateSection?: string; // Field for template sections
  backgroundType?: 'color' | 'gradient' | 'image'; // New field for background type
  backgroundValue?: string; // New field for background value (color code, gradient string, or image URL)
  blurAmount?: number; // New field for blur effect
  opacity?: number; // New field for opacity (0-100)
  enable3D?: boolean; // New field for 3D effect toggle
}

