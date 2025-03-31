
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
}
