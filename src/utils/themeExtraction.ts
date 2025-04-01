
// Helper functions for extracting theme data from websites

/**
 * Analyzes a website URL and extracts color schemes, typography, and styling
 * @param url The website URL to analyze
 * @returns Promise with extracted theme data
 */
export const extractThemeFromURL = async (url: string): Promise<any> => {
  try {
    // In a real implementation, this would make API calls to a service
    // that analyzes the website (like an AI service or web scraper)
    // For now, we'll simulate the extraction process
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a color palette based on the URL
    // In reality, this would analyze the actual website's colors
    const hash = hashString(url);
    
    return {
      name: `Extracted from ${new URL(url).hostname}`,
      colors: {
        primary: generateColor(hash),
        secondary: generateColor(hash + 50),
        accent: generateColor(hash + 100),
        background: {
          dark: generateDarkColor(hash),
          light: generateLightColor(hash + 30),
        },
        text: {
          dark: "#374151",
          light: "#FFFFFF",
        },
        border: generateLightColor(hash + 60),
      },
      typography: {
        fontFamily: selectFont(hash % 5),
        sizeScale: (hash % 20) / 100 + 1.2, // Between 1.2 and 1.4
        baseSize: "16px",
      },
      borderRadius: `${4 + (hash % 12)}px`,
      shadows: {
        small: "0 1px 3px rgba(0,0,0,0.1)",
        medium: "0 4px 6px rgba(0,0,0,0.1)",
        large: "0 10px 15px rgba(0,0,0,0.1)",
      },
    };
  } catch (error) {
    console.error("Error extracting theme:", error);
    throw new Error("Failed to extract theme from URL");
  }
};

/**
 * Maps the extracted theme data to our template styles format
 * @param themeData The extracted theme data
 * @returns TemplateStyles object with mapped values
 */
export const mapExtractedThemeToTemplateStyles = (themeData: any) => {
  return {
    headerBg: themeData.colors.background.dark,
    headerTextColor: themeData.colors.text.light,
    headerHeight: "4rem",
    bannerBg: `bg-gradient-to-r from-[${themeData.colors.background.dark}] to-[${themeData.colors.primary}]`,
    bannerTextColor: themeData.colors.text.light,
    bannerHeight: "20rem",
    collectionBg: themeData.colors.background.dark,
    collectionTextColor: themeData.colors.text.light,
    cardBg: shadeColor(themeData.colors.background.dark, 10),
    cardTextColor: themeData.colors.text.light,
    accentColor: themeData.colors.accent,
    borderColor: themeData.colors.border,
    buttonBg: themeData.colors.primary,
    buttonTextColor: themeData.colors.text.light,
    buttonRadius: themeData.borderRadius,
    headingFont: mapFontToClassName(themeData.typography.fontFamily),
    bodyFont: "font-sans",
    gridColumns: 4,
    spacing: "1.5rem",
    enable3D: false
  };
};

// Helper functions
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

const generateColor = (seed: number): string => {
  const r = (seed * 123) % 255;
  const g = (seed * 456) % 255;
  const b = (seed * 789) % 255;
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const generateDarkColor = (seed: number): string => {
  const r = (seed * 123) % 80;  // Keep it dark
  const g = (seed * 456) % 80;
  const b = (seed * 789) % 100;
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const generateLightColor = (seed: number): string => {
  const r = 180 + (seed * 123) % 75;  // Keep it light
  const g = 180 + (seed * 456) % 75;
  const b = 180 + (seed * 789) % 75;
  return `#${Math.min(r, 255).toString(16).padStart(2, '0')}${Math.min(g, 255).toString(16).padStart(2, '0')}${Math.min(b, 255).toString(16).padStart(2, '0')}`;
};

const selectFont = (index: number): string => {
  const fonts = ["Inter", "Roboto", "Montserrat", "Poppins", "Open Sans"];
  return fonts[index];
};

const mapFontToClassName = (font: string): string => {
  const fontMap: Record<string, string> = {
    "Inter": "font-sans",
    "Roboto": "font-sans",
    "Montserrat": "font-display",
    "Poppins": "font-display",
    "Open Sans": "font-sans"
  };
  
  return fontMap[font] || "font-sans";
};

const shadeColor = (color: string, percent: number): string => {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.min(255, Math.max(0, R + percent));
  G = Math.min(255, Math.max(0, G + percent));
  B = Math.min(255, Math.max(0, B + percent));

  const RR = R.toString(16).padStart(2, '0');
  const GG = G.toString(16).padStart(2, '0');
  const BB = B.toString(16).padStart(2, '0');

  return `#${RR}${GG}${BB}`;
};
