
import React, { useState } from "react";
import { X, Globe, Wand2, ArrowRight, Loader2 } from "lucide-react";
import { extractThemeFromURL, mapExtractedThemeToTemplateStyles } from "../../utils/themeExtraction";
import { toast } from "@/components/ui/use-toast";

interface AIThemeExtractorProps {
  onClose: () => void;
  onExtract: (themeData: any) => void;
}

const AIThemeExtractor: React.FC<AIThemeExtractorProps> = ({ onClose, onExtract }) => {
  const [url, setUrl] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-editor-panel rounded-lg shadow-xl overflow-hidden w-full max-w-2xl animate-scale-in">
        <div className="editor-toolbar justify-between">
          <span className="text-editor-text text-sm font-medium">AI Theme Extractor</span>
          <button className="editor-button p-1.5" onClick={onClose}>
            <X size={14} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <p className="text-editor-text text-sm mb-4">
              Enter a website URL to extract its design elements. Our AI will analyze the site and create a theme based on its colors, typography, and styling.
            </p>
            
            <div className="flex">
              <div className="flex-1 flex items-center bg-editor-surface border border-editor-border rounded-l-md px-3">
                <Globe size={16} className="text-editor-muted mr-2" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 bg-transparent border-none text-editor-text py-2 focus:outline-none text-sm"
                />
              </div>
              <button
                className="editor-button-primary rounded-l-none px-4 flex items-center"
                onClick={handleExtract}
                disabled={!url || extracting}
              >
                {extracting ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    Extracting...
                  </>
                ) : (
                  <>
                    <Wand2 size={16} className="mr-2" />
                    Extract
                  </>
                )}
              </button>
            </div>
            
            {error && (
              <div className="mt-2 text-red-500 text-xs">
                {error}
              </div>
            )}
          </div>
          
          {extracting && (
            <div className="border border-editor-border rounded-md p-4 mb-6">
              <div className="flex items-center justify-center mb-2">
                <Loader2 size={24} className="text-editor-accent animate-spin" />
              </div>
              <p className="text-center text-editor-text text-sm">
                Analyzing website design elements...
              </p>
              <div className="mt-4 space-y-2">
                <div className="ai-processing-animation h-2 rounded-full"></div>
                <div className="ai-processing-animation h-2 rounded-full"></div>
                <div className="ai-processing-animation h-2 rounded-full"></div>
              </div>
            </div>
          )}
          
          {previewData && (
            <div className="border border-editor-border rounded-md overflow-hidden mb-6">
              <div className="editor-toolbar justify-between py-3 px-4">
                <span className="text-editor-text text-sm font-medium">Extracted Theme Preview</span>
              </div>
              
              <div className="p-4 grid grid-cols-2 gap-6">
                <div>
                  <div className="text-xs text-editor-muted mb-2">Colors</div>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div 
                      className="w-full aspect-square rounded-md" 
                      style={{ backgroundColor: previewData.raw.colors.primary }}
                      title="Primary"
                    ></div>
                    <div 
                      className="w-full aspect-square rounded-md" 
                      style={{ backgroundColor: previewData.raw.colors.secondary }}
                      title="Secondary"
                    ></div>
                    <div 
                      className="w-full aspect-square rounded-md" 
                      style={{ backgroundColor: previewData.raw.colors.accent }}
                      title="Accent"
                    ></div>
                    <div 
                      className="w-full aspect-square rounded-md" 
                      style={{ backgroundColor: previewData.raw.colors.border }}
                      title="Border"
                    ></div>
                  </div>
                  
                  <div className="text-xs text-editor-muted mb-2">Typography</div>
                  <div className="space-y-2 mb-4" style={{ fontFamily: previewData.raw.typography.fontFamily }}>
                    <div className="text-lg font-bold text-editor-text">Heading Example</div>
                    <div className="text-sm text-editor-text">Body text example using the extracted font settings.</div>
                    <div className="text-xs text-editor-muted">Caption or small text example</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-editor-muted mb-2">Component Previews</div>
                    <div className="space-y-2">
                      <button 
                        className="w-full py-2 px-4 rounded-md text-white text-sm font-medium" 
                        style={{ 
                          backgroundColor: previewData.raw.colors.primary,
                          borderRadius: previewData.raw.borderRadius
                        }}
                      >
                        Primary Button
                      </button>
                      <button 
                        className="w-full py-2 px-4 text-editor-text text-sm font-medium bg-editor-surface border border-editor-border"
                        style={{ borderRadius: previewData.raw.borderRadius }}
                      >
                        Secondary Button
                      </button>
                      <div 
                        className="p-3 bg-editor-surface border border-editor-border"
                        style={{ 
                          borderRadius: previewData.raw.borderRadius,
                          backgroundColor: previewData.raw.colors.background.dark,
                          color: previewData.raw.colors.text.light,
                        }}
                      >
                        <div className="text-sm font-medium mb-1">Card Title</div>
                        <div className="text-xs opacity-80">Card content example with extracted styles</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-editor-muted mb-2">Border & Radius</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div 
                        className="aspect-video border border-editor-border flex items-center justify-center"
                        style={{ borderRadius: previewData.raw.borderRadius }}
                      >
                        <span className="text-xs text-editor-muted">{previewData.raw.borderRadius}</span>
                      </div>
                      <div 
                        className="aspect-video shadow-md flex items-center justify-center"
                        style={{ 
                          borderRadius: previewData.raw.borderRadius,
                          boxShadow: previewData.raw.shadows.medium
                        }}
                      >
                        <span className="text-xs text-editor-muted">Shadow</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              className="editor-button px-4"
              onClick={onClose}
            >
              Cancel
            </button>
            
            {previewData && (
              <button
                className="editor-button-primary px-4 flex items-center"
                onClick={handleApply}
              >
                Apply Theme
                <ArrowRight size={16} className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIThemeExtractor;
