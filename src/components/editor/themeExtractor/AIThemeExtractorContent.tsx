
import React, { useState, useEffect } from "react";
import { extractThemeFromURL, mapExtractedThemeToTemplateStyles } from "@/utils/themeExtraction";
import { toast } from "@/components/ui/use-toast";
import URLInput from "./URLInput";
import LoadingIndicator from "./LoadingIndicator";
import PreviewTabs from "./PreviewTabs";
import ActionButtons from "./ActionButtons";

interface AIThemeExtractorContentProps {
  onClose: () => void;
  onExtract: (themeData: any) => void;
}

const AIThemeExtractorContent: React.FC<AIThemeExtractorContentProps> = ({ onClose, onExtract }) => {
  const [url, setUrl] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("colors");
  
  const validateUrl = (input: string): boolean => {
    try {
      new URL(input);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const handleExtract = async () => {
    // Reset states
    setError(null);
    setPreviewData(null);
    
    // Validate URL format
    if (!validateUrl(url)) {
      setError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }
    
    setExtracting(true);
    
    try {
      // Extract theme data from the URL
      const themeData = await extractThemeFromURL(url);
      
      // Map the extracted data to our template format
      const templateStyles = mapExtractedThemeToTemplateStyles(themeData);
      
      // Store both the raw extracted data and the mapped template styles
      setPreviewData({
        raw: themeData,
        template: templateStyles
      });
      
      toast({
        title: "Theme Extracted",
        description: "Successfully analyzed website design elements"
      });
    } catch (error) {
      console.error("Extraction error:", error);
      setError("Failed to extract theme. Please check the URL and try again.");
      
      toast({
        title: "Extraction Failed",
        description: "Could not extract theme from the provided URL",
        variant: "destructive"
      });
    } finally {
      setExtracting(false);
    }
  };
  
  const handleApply = () => {
    // Pass both the raw extracted data and the mapped template styles
    onExtract(previewData);
    onClose();
  };
  
  return (
    <div className="p-6">
      <URLInput 
        url={url}
        setUrl={setUrl}
        error={error}
        extracting={extracting}
        handleExtract={handleExtract}
      />
      
      {extracting && <LoadingIndicator />}
      
      {previewData && (
        <PreviewTabs 
          previewData={previewData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
      
      <ActionButtons 
        onClose={onClose}
        onApply={handleApply}
        showApply={!!previewData}
      />
    </div>
  );
};

export default AIThemeExtractorContent;
