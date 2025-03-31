
import React from "react";
import MarketplaceTemplate from "../templates/MarketplaceTemplate";
import DropsTemplate from "../templates/DropsTemplate";
import TokenGateTemplate from "../templates/TokenGateTemplate";
import BuyCoinTemplate from "../templates/BuyCoinTemplate";
import { TemplateStyles } from "../../../types/templateStyles";

interface TemplateRendererProps {
  activeTemplate: string;
  templateStyles: TemplateStyles;
}

const TemplateRenderer: React.FC<TemplateRendererProps> = ({ 
  activeTemplate, 
  templateStyles 
}) => {
  switch (activeTemplate) {
    case "marketplace":
      return <MarketplaceTemplate styles={templateStyles} />;
    case "drops":
      return <DropsTemplate />;
    case "token-gate":
      return <TokenGateTemplate />;
    case "buy-coin":
      return <BuyCoinTemplate />;
    default:
      return null;
  }
};

export default TemplateRenderer;
