
import React, { useState } from "react";
import { X, Globe, Wand2, ArrowRight, Loader2 } from "lucide-react";

interface AIThemeExtractorProps {
  onClose: () => void;
  onExtract: (themeData: any) => void;
}

const AIThemeExtractor: React.FC<AIThemeExtractorProps> = ({ onClose, onExtract }) => {
  const [url, setUrl] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [previewData, setPreviewData] = useState<any>(null);
  
  const handleExtract = () => {
    setExtracting(true);
    
    // Simulate AI extraction process
    setTimeout(() => {
      const mockThemeData = {
        name: "Extracted Theme",
        colors: {
          primary: "#3B82F6",
          secondary: "#60A5FA",
          accent: "#F59E0B",
          background: {
            dark: "#111827",
            light: "#FFFFFF",
          },
          text: {
            dark: "#374151",
            light: "#FFFFFF",
          },
          border: "#E5E7EB",
        },
        typography: {
          fontFamily: "Inter",
          sizeScale: 1.333,
          baseSize: "16px",
        },
        borderRadius: "8px",
        shadows: {
          small: "0 1px 3px rgba(0,0,0,0.1)",
          medium: "0 4px 6px rgba(0,0,0,0.1)",
          large: "0 10px 15px rgba(0,0,0,0.1)",
        },
      };
      
      setPreviewData(mockThemeData);
      setExtracting(false);
    }, 3000);
  };
  
  const handleApply = () => {
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
                    <div className="w-full aspect-square rounded-md" style={{ backgroundColor: previewData.colors.primary }}></div>
                    <div className="w-full aspect-square rounded-md" style={{ backgroundColor: previewData.colors.secondary }}></div>
                    <div className="w-full aspect-square rounded-md" style={{ backgroundColor: previewData.colors.accent }}></div>
                    <div className="w-full aspect-square rounded-md" style={{ backgroundColor: previewData.colors.border }}></div>
                  </div>
                  
                  <div className="text-xs text-editor-muted mb-2">Typography</div>
                  <div className="space-y-2 mb-4">
                    <div className="text-lg font-bold text-editor-text">Heading Example</div>
                    <div className="text-sm text-editor-text">Body text example using the extracted font settings.</div>
                    <div className="text-xs text-editor-muted">Caption or small text example</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-editor-muted mb-2">Component Previews</div>
                    <div className="space-y-2">
                      <button className="w-full py-2 px-4 rounded-md text-white text-sm font-medium" style={{ backgroundColor: previewData.colors.primary }}>
                        Primary Button
                      </button>
                      <button className="w-full py-2 px-4 rounded-md text-editor-text text-sm font-medium bg-editor-surface border border-editor-border">
                        Secondary Button
                      </button>
                      <div className="p-3 rounded-md bg-editor-surface border border-editor-border">
                        <div className="text-sm font-medium text-editor-text mb-1">Card Title</div>
                        <div className="text-xs text-editor-muted">Card content example with extracted styles</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-editor-muted mb-2">Border & Radius</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="aspect-video rounded-md border border-editor-border flex items-center justify-center">
                        <span className="text-xs text-editor-muted">{previewData.borderRadius}</span>
                      </div>
                      <div className="aspect-video rounded-md shadow-md flex items-center justify-center">
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
