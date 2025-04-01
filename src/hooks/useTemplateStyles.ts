
import { useState } from "react";
import { TemplateStyles, TemplateType } from "../types/templateStyles";
import { toast } from "@/components/ui/use-toast";

export const useTemplateStyles = () => {
  // Default styles for each template type
  const [templateStyles, setTemplateStyles] = useState<Record<TemplateType, TemplateStyles>>({
    marketplace: {
      headerBg: "#18181E",
      headerTextColor: "white",
      headerHeight: "4rem",
      bannerBg: "bg-gradient-to-r from-[#232329] to-[#18181E]",
      bannerTextColor: "white",
      bannerHeight: "20rem",
      collectionBg: "#18181E",
      collectionTextColor: "white",
      cardBg: "#232329",
      cardTextColor: "white",
      accentColor: "#9b87f5",
      borderColor: "#333333",
      buttonBg: "#9b87f5",
      buttonTextColor: "white",
      buttonRadius: "0.5rem",
      headingFont: "font-display",
      bodyFont: "font-sans",
      gridColumns: 4,
      spacing: "1.5rem",
      enable3D: false
    },
    drops: {
      headerBg: "#18181E",
      headerTextColor: "white",
      headerHeight: "4rem",
      bannerBg: "bg-gradient-to-r from-[#232329] to-[#18181E]",
      bannerTextColor: "white",
      bannerHeight: "20rem",
      collectionBg: "#18181E",
      collectionTextColor: "white",
      cardBg: "#232329",
      cardTextColor: "white",
      accentColor: "#9b87f5",
      borderColor: "#333333",
      buttonBg: "#9b87f5",
      buttonTextColor: "white",
      buttonRadius: "0.5rem",
      headingFont: "font-display",
      bodyFont: "font-sans",
      gridColumns: 3,
      spacing: "1.5rem",
      enable3D: false
    },
    "token-gate": {
      headerBg: "#18181E",
      headerTextColor: "white",
      headerHeight: "4rem",
      bannerBg: "bg-gradient-to-r from-[#232329] to-[#18181E]",
      bannerTextColor: "white",
      bannerHeight: "20rem",
      collectionBg: "#18181E",
      collectionTextColor: "white",
      cardBg: "#232329",
      cardTextColor: "white",
      accentColor: "#9b87f5",
      borderColor: "#333333",
      buttonBg: "#9b87f5",
      buttonTextColor: "white",
      buttonRadius: "0.5rem",
      headingFont: "font-display",
      bodyFont: "font-sans",
      gridColumns: 2,
      spacing: "1.5rem",
      enable3D: false
    },
    "buy-coin": {
      headerBg: "#18181E",
      headerTextColor: "white",
      headerHeight: "4rem",
      bannerBg: "bg-gradient-to-r from-[#232329] to-[#18181E]",
      bannerTextColor: "white",
      bannerHeight: "20rem",
      collectionBg: "#18181E",
      collectionTextColor: "white",
      cardBg: "#232329",
      cardTextColor: "white",
      accentColor: "#9b87f5",
      borderColor: "#333333",
      buttonBg: "#9b87f5",
      buttonTextColor: "white",
      buttonRadius: "0.5rem",
      headingFont: "font-display",
      bodyFont: "font-sans",
      gridColumns: 1,
      spacing: "1.5rem",
      enable3D: false
    }
  });

  const [activeTemplate, setActiveTemplate] = useState<TemplateType>("marketplace");

  // Function to update styles for the current template
  const updateTemplateStyles = (property: keyof TemplateStyles, value: any) => {
    setTemplateStyles(prev => ({
      ...prev,
      [activeTemplate]: {
        ...prev[activeTemplate],
        [property]: value
      }
    }));
    
    toast({
      title: "Style Updated",
      description: `Updated ${property} to ${value}`
    });
  };

  // Function to apply a style property to all templates
  const applyToAllSites = (property: keyof TemplateStyles, value: any) => {
    setTemplateStyles(prev => {
      const updatedStyles = { ...prev };
      
      // Apply the value to all template types
      (Object.keys(updatedStyles) as TemplateType[]).forEach(templateType => {
        updatedStyles[templateType] = {
          ...updatedStyles[templateType],
          [property]: value
        };
      });
      
      return updatedStyles;
    });
    
    toast({
      title: "Applied to All Sites",
      description: `Updated ${property} to ${value} across all templates`
    });
  };

  // New function to update all style properties for all templates
  const updateAllTemplateStyles = (newStyles: Partial<TemplateStyles>) => {
    setTemplateStyles(prev => {
      const updatedStyles = { ...prev };
      
      // Apply all the new values to all template types while preserving
      // template-specific values like gridColumns
      (Object.keys(updatedStyles) as TemplateType[]).forEach(templateType => {
        updatedStyles[templateType] = {
          ...updatedStyles[templateType],
          ...newStyles,
          // Preserve template-specific properties
          gridColumns: updatedStyles[templateType].gridColumns
        };
      });
      
      return updatedStyles;
    });
  };

  return {
    templateStyles,
    activeTemplate,
    setActiveTemplate,
    updateTemplateStyles,
    applyToAllSites,
    updateAllTemplateStyles,
    currentTemplateStyles: templateStyles[activeTemplate]
  };
};
