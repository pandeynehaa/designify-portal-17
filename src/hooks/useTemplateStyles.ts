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
      enable3D: false // Initialize with 3D effect off
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
      enable3D: false // Initialize with 3D effect off
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
      enable3D: false // Initialize with 3D effect off
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
      enable3D: false // Initialize with 3D effect off
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

  return {
    templateStyles,
    activeTemplate,
    setActiveTemplate,
    updateTemplateStyles,
    currentTemplateStyles: templateStyles[activeTemplate]
  };
};
