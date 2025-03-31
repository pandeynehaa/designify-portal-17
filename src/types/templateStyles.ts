
// Define the type for template styles
export interface TemplateStyles {
  headerBg: string;
  headerTextColor: string;
  headerHeight: string;
  bannerBg: string;
  bannerTextColor: string;
  bannerHeight: string;
  collectionBg: string;
  collectionTextColor: string;
  cardBg: string;
  cardTextColor: string;
  accentColor: string;
  borderColor: string;
  buttonBg: string;
  buttonTextColor: string;
  buttonRadius: string;
  headingFont: string;
  bodyFont: string;
  gridColumns: number;
  spacing: string;
}

export type TemplateType = "marketplace" | "drops" | "token-gate" | "buy-coin";
