
import { TemplateStyles } from "../types/templateStyles";
import { toast } from "@/components/ui/use-toast";

/**
 * Applies a preset theme to a template
 */
export const applyPresetTheme = (
  theme: 'default' | 'dark' | 'light' | 'colorful',
  updateTemplateStyles: (property: keyof TemplateStyles, value: any) => void
) => {
  switch (theme) {
    case 'default':
      updateTemplateStyles('accentColor', '#9b87f5');
      updateTemplateStyles('buttonBg', '#9b87f5');
      updateTemplateStyles('headerBg', '#18181E');
      updateTemplateStyles('collectionBg', '#18181E');
      updateTemplateStyles('cardBg', '#232329');
      updateTemplateStyles('headerTextColor', 'white');
      updateTemplateStyles('bannerTextColor', 'white');
      updateTemplateStyles('collectionTextColor', 'white');
      updateTemplateStyles('cardTextColor', 'white');
      updateTemplateStyles('buttonTextColor', 'white');
      break;
    case 'dark':
      updateTemplateStyles('accentColor', '#7E69AB');
      updateTemplateStyles('buttonBg', '#7E69AB');
      updateTemplateStyles('headerBg', '#111111');
      updateTemplateStyles('collectionBg', '#111111');
      updateTemplateStyles('cardBg', '#1A1A1A');
      updateTemplateStyles('headerTextColor', '#CCCCCC');
      updateTemplateStyles('bannerTextColor', '#CCCCCC');
      updateTemplateStyles('collectionTextColor', '#CCCCCC');
      updateTemplateStyles('cardTextColor', '#CCCCCC');
      updateTemplateStyles('buttonTextColor', '#FFFFFF');
      break;
    case 'light':
      updateTemplateStyles('accentColor', '#b6a8f8');
      updateTemplateStyles('buttonBg', '#b6a8f8');
      updateTemplateStyles('headerBg', '#FFFFFF');
      updateTemplateStyles('collectionBg', '#F5F5F5');
      updateTemplateStyles('cardBg', '#FFFFFF');
      updateTemplateStyles('headerTextColor', '#333333');
      updateTemplateStyles('bannerTextColor', '#333333');
      updateTemplateStyles('collectionTextColor', '#333333');
      updateTemplateStyles('cardTextColor', '#333333');
      updateTemplateStyles('buttonTextColor', '#FFFFFF');
      break;
    case 'colorful':
      updateTemplateStyles('accentColor', '#b6a8f8');
      updateTemplateStyles('buttonBg', '#9b87f5');
      updateTemplateStyles('headerBg', '#1F1D36');
      updateTemplateStyles('collectionBg', '#3F3351');
      updateTemplateStyles('cardBg', '#864879');
      updateTemplateStyles('headerTextColor', '#FFFFFF');
      updateTemplateStyles('bannerTextColor', '#FFFFFF');
      updateTemplateStyles('collectionTextColor', '#FFFFFF');
      updateTemplateStyles('cardTextColor', '#FFFFFF');
      updateTemplateStyles('buttonTextColor', '#FFFFFF');
      break;
  }
};

/**
 * Applies a preset theme to all template types
 */
export const applyPresetThemeToAllSites = (
  theme: 'default' | 'dark' | 'light' | 'colorful',
  applyToAllSites: (property: keyof TemplateStyles, value: any) => void
) => {
  switch (theme) {
    case 'default':
      applyToAllSites('accentColor', '#9b87f5');
      applyToAllSites('buttonBg', '#9b87f5');
      applyToAllSites('headerBg', '#18181E');
      applyToAllSites('collectionBg', '#18181E');
      applyToAllSites('cardBg', '#232329');
      applyToAllSites('headerTextColor', 'white');
      applyToAllSites('bannerTextColor', 'white');
      applyToAllSites('collectionTextColor', 'white');
      applyToAllSites('cardTextColor', 'white');
      applyToAllSites('buttonTextColor', 'white');
      break;
    case 'dark':
      applyToAllSites('accentColor', '#7E69AB');
      applyToAllSites('buttonBg', '#7E69AB');
      applyToAllSites('headerBg', '#111111');
      applyToAllSites('collectionBg', '#111111');
      applyToAllSites('cardBg', '#1A1A1A');
      applyToAllSites('headerTextColor', '#CCCCCC');
      applyToAllSites('bannerTextColor', '#CCCCCC');
      applyToAllSites('collectionTextColor', '#CCCCCC');
      applyToAllSites('cardTextColor', '#CCCCCC');
      applyToAllSites('buttonTextColor', '#FFFFFF');
      break;
    case 'light':
      applyToAllSites('accentColor', '#b6a8f8');
      applyToAllSites('buttonBg', '#b6a8f8');
      applyToAllSites('headerBg', '#FFFFFF');
      applyToAllSites('collectionBg', '#F5F5F5');
      applyToAllSites('cardBg', '#FFFFFF');
      applyToAllSites('headerTextColor', '#333333');
      applyToAllSites('bannerTextColor', '#333333');
      applyToAllSites('collectionTextColor', '#333333');
      applyToAllSites('cardTextColor', '#333333');
      applyToAllSites('buttonTextColor', '#FFFFFF');
      break;
    case 'colorful':
      applyToAllSites('accentColor', '#b6a8f8');
      applyToAllSites('buttonBg', '#9b87f5');
      applyToAllSites('headerBg', '#1F1D36');
      applyToAllSites('collectionBg', '#3F3351');
      applyToAllSites('cardBg', '#864879');
      applyToAllSites('headerTextColor', '#FFFFFF');
      applyToAllSites('bannerTextColor', '#FFFFFF');
      applyToAllSites('collectionTextColor', '#FFFFFF');
      applyToAllSites('cardTextColor', '#FFFFFF');
      applyToAllSites('buttonTextColor', '#FFFFFF');
      break;
  }
  
  toast({
    title: "Theme Applied to All Sites",
    description: `The ${theme} theme has been applied to all Web3 sites.`
  });
};
