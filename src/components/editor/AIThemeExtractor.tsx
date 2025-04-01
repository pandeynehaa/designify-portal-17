
import React, { useState } from "react";
import { X, Globe, Wand2, ArrowRight, Loader2, FileImage, Type, Palette, Layout, Box } from "lucide-react";
import { extractThemeFromURL, mapExtractedThemeToTemplateStyles } from "../../utils/themeExtraction";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AIThemeExtractorProps {
  onClose: () => void;
  onExtract: (themeData: any) => void;
}

const AIThemeExtractor: React.FC<AIThemeExtractorProps> = ({ onClose, onExtract }) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-editor-panel rounded-lg shadow-xl overflow-hidden w-full max-w-4xl animate-scale-in">
        <div className="editor-toolbar justify-between">
          <span className="text-editor-text text-sm font-medium">AI Theme Extractor</span>
          <button className="editor-button p-1.5" onClick={onClose}>
            <X size={14} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <p className="text-editor-text text-sm mb-4">
              Enter a website URL to extract its design elements. Our AI will analyze the site and create a theme based on its colors, typography, spacing, and images.
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
              
              <Tabs defaultValue="colors" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-4 p-1 mx-4 mb-2">
                  <TabsTrigger value="colors" className="flex items-center gap-1.5">
                    <Palette size={14} />
                    <span>Colors</span>
                  </TabsTrigger>
                  <TabsTrigger value="typography" className="flex items-center gap-1.5">
                    <Type size={14} />
                    <span>Typography</span>
                  </TabsTrigger>
                  <TabsTrigger value="layout" className="flex items-center gap-1.5">
                    <Layout size={14} />
                    <span>Spacing</span>
                  </TabsTrigger>
                  <TabsTrigger value="assets" className="flex items-center gap-1.5">
                    <FileImage size={14} />
                    <span>Assets</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="colors" className="p-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs text-editor-muted mb-2">Color Palette</div>
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
                      
                      <div className="text-xs text-editor-muted mb-2">Background Colors</div>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div>
                          <div className="text-xs text-editor-muted mb-1">Dark</div>
                          <div 
                            className="w-full h-8 rounded-md" 
                            style={{ backgroundColor: previewData.raw.colors.background.dark }}
                          ></div>
                        </div>
                        <div>
                          <div className="text-xs text-editor-muted mb-1">Light</div>
                          <div 
                            className="w-full h-8 rounded-md" 
                            style={{ backgroundColor: previewData.raw.colors.background.light }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-editor-muted mb-2">Text Colors</div>
                      <div className="space-y-3 mb-4">
                        <div>
                          <div className="text-xs text-editor-muted mb-1">Heading</div>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-6 h-6 rounded-md" 
                              style={{ backgroundColor: previewData.raw.colors.text.heading }}
                            ></div>
                            <span className="text-xs text-editor-text">
                              {previewData.raw.colors.text.heading}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-editor-muted mb-1">Body</div>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-6 h-6 rounded-md" 
                              style={{ backgroundColor: previewData.raw.colors.text.body }}
                            ></div>
                            <span className="text-xs text-editor-text">
                              {previewData.raw.colors.text.body}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <div className="text-xs text-editor-muted mb-1">Button</div>
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-6 h-6 rounded-md" 
                              style={{ backgroundColor: previewData.raw.colors.text.button }}
                            ></div>
                            <span className="text-xs text-editor-text">
                              {previewData.raw.colors.text.button}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-editor-muted mb-2">Button Colors</div>
                      <div className="space-y-2">
                        <button 
                          className="w-full py-2 px-4 text-white text-sm font-medium" 
                          style={{ 
                            backgroundColor: previewData.raw.colors.primary,
                            borderRadius: previewData.raw.buttons.borderRadius,
                            padding: previewData.raw.buttons.padding
                          }}
                        >
                          Primary Button
                        </button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="typography" className="p-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs text-editor-muted mb-2">Heading Typography</div>
                      <div className="p-3 bg-editor-surface border border-editor-border rounded-md mb-4">
                        <div className="text-xs text-editor-muted mb-2 flex flex-wrap">
                          <span className="mr-4">Font: <strong>{previewData.raw.typography.heading.fontFamily}</strong></span>
                          <span className="mr-4">Size: <strong>{previewData.raw.typography.heading.size}</strong></span>
                          <span className="mr-4">Weight: <strong>{previewData.raw.typography.heading.weight}</strong></span>
                          <span className="mr-4">Transform: <strong>{previewData.raw.typography.heading.transform}</strong></span>
                        </div>
                        <div 
                          style={{ 
                            fontFamily: previewData.raw.typography.heading.fontFamily,
                            fontSize: previewData.raw.typography.heading.size,
                            fontWeight: previewData.raw.typography.heading.weight,
                            lineHeight: previewData.raw.typography.heading.lineHeight,
                            letterSpacing: previewData.raw.typography.heading.letterSpacing,
                            textTransform: previewData.raw.typography.heading.transform as any,
                            fontStyle: previewData.raw.typography.heading.style,
                            color: previewData.raw.colors.text.heading
                          }}
                        >
                          Heading Example
                        </div>
                      </div>
                      
                      <div className="text-xs text-editor-muted mb-2">Body Typography</div>
                      <div className="p-3 bg-editor-surface border border-editor-border rounded-md">
                        <div className="text-xs text-editor-muted mb-2 flex flex-wrap">
                          <span className="mr-4">Font: <strong>{previewData.raw.typography.body.fontFamily}</strong></span>
                          <span className="mr-4">Size: <strong>{previewData.raw.typography.body.size}</strong></span>
                          <span className="mr-4">Weight: <strong>{previewData.raw.typography.body.weight}</strong></span>
                        </div>
                        <div 
                          style={{ 
                            fontFamily: previewData.raw.typography.body.fontFamily,
                            fontSize: previewData.raw.typography.body.size,
                            fontWeight: previewData.raw.typography.body.weight,
                            lineHeight: previewData.raw.typography.body.lineHeight,
                            letterSpacing: previewData.raw.typography.body.letterSpacing,
                            color: previewData.raw.colors.text.body
                          }}
                        >
                          This is an example of body text using the extracted font settings. The text should reflect the font family, size, weight and other typography settings found on the website.
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-editor-muted mb-2">Button Typography</div>
                      <div className="mb-4">
                        <div className="text-xs text-editor-muted mb-2 flex flex-wrap">
                          <span className="mr-4">Font: <strong>{previewData.raw.typography.button.fontFamily}</strong></span>
                          <span className="mr-4">Size: <strong>{previewData.raw.typography.button.size}</strong></span>
                          <span className="mr-4">Weight: <strong>{previewData.raw.typography.button.weight}</strong></span>
                          <span className="mr-4">Transform: <strong>{previewData.raw.typography.button.transform}</strong></span>
                        </div>
                        <button 
                          className="py-2 px-4 rounded-md text-white mb-4" 
                          style={{ 
                            backgroundColor: previewData.raw.colors.primary,
                            fontFamily: previewData.raw.typography.button.fontFamily,
                            fontSize: previewData.raw.typography.button.size,
                            fontWeight: previewData.raw.typography.button.weight,
                            textTransform: previewData.raw.typography.button.transform as any,
                            borderRadius: previewData.raw.buttons.borderRadius,
                            padding: previewData.raw.buttons.padding
                          }}
                        >
                          Button Example
                        </button>
                      </div>
                      
                      <div className="text-xs text-editor-muted mb-2">Typography Preview</div>
                      <div 
                        className="p-4 rounded-md"
                        style={{ backgroundColor: previewData.raw.colors.background.dark }}
                      >
                        <div 
                          style={{ 
                            fontFamily: previewData.raw.typography.heading.fontFamily,
                            fontSize: previewData.raw.typography.heading.size,
                            fontWeight: previewData.raw.typography.heading.weight,
                            lineHeight: previewData.raw.typography.heading.lineHeight,
                            letterSpacing: previewData.raw.typography.heading.letterSpacing,
                            textTransform: previewData.raw.typography.heading.transform as any,
                            fontStyle: previewData.raw.typography.heading.style,
                            color: previewData.raw.colors.text.heading,
                            marginBottom: previewData.raw.spacing.base
                          }}
                        >
                          Sample Header
                        </div>
                        <div 
                          style={{ 
                            fontFamily: previewData.raw.typography.body.fontFamily,
                            fontSize: previewData.raw.typography.body.size,
                            fontWeight: previewData.raw.typography.body.weight,
                            lineHeight: previewData.raw.typography.body.lineHeight,
                            letterSpacing: previewData.raw.typography.body.letterSpacing,
                            color: previewData.raw.colors.text.body,
                            marginBottom: previewData.raw.spacing.base
                          }}
                        >
                          This is a preview of how text might appear on the website with the extracted font settings applied.
                        </div>
                        <button 
                          style={{ 
                            backgroundColor: previewData.raw.colors.primary,
                            fontFamily: previewData.raw.typography.button.fontFamily,
                            fontSize: previewData.raw.typography.button.size,
                            fontWeight: previewData.raw.typography.button.weight,
                            textTransform: previewData.raw.typography.button.transform as any,
                            color: previewData.raw.colors.text.button,
                            borderRadius: previewData.raw.buttons.borderRadius,
                            padding: previewData.raw.buttons.padding
                          }}
                        >
                          Click Me
                        </button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="layout" className="p-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs text-editor-muted mb-2">Spacing Guidelines</div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-editor-text">Base Spacing:</span>
                          <span className="text-xs font-medium text-editor-text">{previewData.raw.spacing.base}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-editor-text">Section Spacing:</span>
                          <span className="text-xs font-medium text-editor-text">{previewData.raw.spacing.section}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-editor-text">Grid Gap:</span>
                          <span className="text-xs font-medium text-editor-text">{previewData.raw.spacing.gridGap}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="text-xs text-editor-muted mb-2">Spacing Visualization</div>
                        <div className="bg-editor-surface border border-editor-border rounded-md p-3">
                          <div className="bg-editor-highlight p-2 rounded-md mb-2" style={{ marginBottom: previewData.raw.spacing.base }}>
                            <div className="text-xs text-editor-text">Base Spacing</div>
                          </div>
                          <div className="bg-editor-highlight p-2 rounded-md" style={{ marginBottom: previewData.raw.spacing.section }}>
                            <div className="text-xs text-editor-text">Section Spacing</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs text-editor-muted mb-2">Grid Example</div>
                      <div className="bg-editor-surface border border-editor-border rounded-md p-3">
                        <div className="grid grid-cols-2 gap-2" style={{ gap: previewData.raw.spacing.gridGap }}>
                          {[1, 2, 3, 4].map(i => (
                            <div
                              key={i}
                              className="aspect-video flex items-center justify-center"
                              style={{ 
                                backgroundColor: previewData.raw.colors.primary,
                                borderRadius: previewData.raw.borderRadius
                              }}
                            >
                              <span className="text-white text-xs">Grid Item {i}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="text-xs text-editor-muted mb-2">Border Radius</div>
                        <div className="bg-editor-surface border border-editor-border rounded-md p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-editor-text">Border Radius:</span>
                            <span className="text-xs font-medium text-editor-text">{previewData.raw.borderRadius}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <div 
                              className="aspect-square bg-editor-highlight flex items-center justify-center" 
                              style={{ borderRadius: previewData.raw.borderRadius }}
                            >
                              <span className="text-xs text-editor-text">Small</span>
                            </div>
                            <div 
                              className="aspect-square bg-editor-highlight flex items-center justify-center" 
                              style={{ borderRadius: previewData.raw.borderRadius }}
                            >
                              <span className="text-xs text-editor-text">Medium</span>
                            </div>
                            <div 
                              className="aspect-square bg-editor-highlight flex items-center justify-center" 
                              style={{ borderRadius: previewData.raw.borderRadius }}
                            >
                              <span className="text-xs text-editor-text">Large</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="assets" className="p-4">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <div className="text-xs text-editor-muted mb-2">Logo</div>
                      <div className="bg-editor-surface border border-editor-border rounded-md p-3 mb-4">
                        <img 
                          src={previewData.raw.logo} 
                          alt="Extracted Logo" 
                          className="max-h-16 max-w-full mx-auto"
                        />
                      </div>
                      
                      <div className="text-xs text-editor-muted mb-2">Extracted Images</div>
                      <div className="grid grid-cols-3 gap-3">
                        {previewData.raw.images.map((image: string, index: number) => (
                          <div key={index} className="bg-editor-surface border border-editor-border rounded-md p-2">
                            <img 
                              src={image} 
                              alt={`Extracted Image ${index + 1}`} 
                              className="w-full h-auto rounded-md"
                            />
                            <div className="text-xs text-editor-muted text-center mt-2">Image {index + 1}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
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
