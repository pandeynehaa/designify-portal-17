import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TemplateStyles } from "../../../types/templateStyles";
import ApplyToAllSites from "./ApplyToAllSites";

interface BackgroundPropertiesProps {
  templateStyles: TemplateStyles;
  updateTemplateStyles: (property: keyof TemplateStyles, value: any) => void;
  applyToAllSites: (property: keyof TemplateStyles, value: any) => void;
}

const BackgroundProperties: React.FC<BackgroundPropertiesProps> = ({ 
  templateStyles, 
  updateTemplateStyles,
  applyToAllSites
}) => {
  const [blurAmount, setBlurAmount] = useState(0);
  const [enable3D, setEnable3D] = useState(templateStyles.enable3D || false);
  
  const handleBackgroundChange = (type: string, value: string) => {
    if (type === 'color') {
      updateTemplateStyles('bannerBg', value);
    } else if (type === 'gradient') {
      updateTemplateStyles('bannerBg', value);
    }
  };
  
  const handleBlurChange = (value: number[]) => {
    setBlurAmount(value[0]);
    console.log("Background blur:", value[0]);
  };
  
  const handle3DToggle = (checked: boolean) => {
    setEnable3D(checked);
    updateTemplateStyles('enable3D', checked);
  };

  return (
    <ScrollArea className="h-[calc(100vh-10rem)]">
      <div className="p-4 space-y-6">
        <div className="relative backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl -z-10"></div>
          <label className="block text-xs text-editor-muted mb-2 opacity-80">Current Background</label>
          
          <div className="h-20 w-full rounded-lg mb-3 overflow-hidden" style={{ background: templateStyles.bannerBg }}>
            <div className="h-full w-full flex items-center justify-center text-xs text-editor-muted">
              Preview
            </div>
          </div>
          
          <Tabs defaultValue="color" className="w-full">
            <TabsList className="grid grid-cols-3 h-9 mb-4">
              <TabsTrigger value="color" className="text-xs">Solid Color</TabsTrigger>
              <TabsTrigger value="gradient" className="text-xs">Gradient</TabsTrigger>
              <TabsTrigger value="image" className="text-xs">Image</TabsTrigger>
            </TabsList>
            
            <TabsContent value="color">
              <div className="grid grid-cols-5 gap-2 mb-3">
                {["#1A1F2C", "#6E59A5", "#8E9196", "#7E69AB", "#9b87f5", 
                  "#F2FCE2", "#FEF7CD", "#FEC6A1", "#E5DEFF", "#FFDEE2"].map((color, index) => (
                  <div 
                    key={index}
                    className="w-full aspect-square rounded-md cursor-pointer hover:ring-2 hover:ring-cv-accent transition-all"
                    style={{ background: color }}
                    onClick={() => handleBackgroundChange('color', color)}
                  />
                ))}
              </div>
              
              <div className="flex gap-2">
                <input 
                  type="color" 
                  className="h-9 w-9 rounded cursor-pointer" 
                  onChange={(e) => handleBackgroundChange('color', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="#RRGGBB"
                  className="flex-1 bg-editor-surface/80 backdrop-blur-sm border border-editor-border/60 rounded-lg text-sm text-editor-text px-3 py-2"
                  defaultValue={templateStyles.bannerBg}
                  onChange={(e) => handleBackgroundChange('color', e.target.value)}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="gradient">
              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
                  "linear-gradient(to top, #e6b980 0%, #eacda3 100%)",
                  "linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)",
                  "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)"
                ].map((gradient, index) => (
                  <div 
                    key={index}
                    className="h-16 rounded-md cursor-pointer hover:ring-2 hover:ring-cv-accent transition-all"
                    style={{ background: gradient }}
                    onClick={() => handleBackgroundChange('gradient', gradient)}
                  />
                ))}
              </div>
              
              <div className="flex gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <label className="text-xs text-editor-muted">Start:</label>
                  <input type="color" className="w-8 h-8 rounded cursor-pointer" />
                </div>
                <div className="flex items-center gap-1">
                  <label className="text-xs text-editor-muted">End:</label>
                  <input type="color" className="w-8 h-8 rounded cursor-pointer" />
                </div>
              </div>
              
              <input
                type="text"
                placeholder="linear-gradient(...)"
                className="w-full bg-editor-surface/80 backdrop-blur-sm border border-editor-border/60 rounded-lg text-sm text-editor-text px-3 py-2"
              />
            </TabsContent>
            
            <TabsContent value="image">
              <div className="flex flex-col items-center justify-center border border-dashed border-editor-border/60 rounded-lg p-4 mb-3">
                <p className="text-sm text-editor-muted mb-2">Upload Background Image</p>
                <button 
                  className="px-3 py-1.5 bg-cv-purple rounded-md text-white text-xs hover:bg-cv-accent transition-colors"
                >
                  Choose File
                </button>
              </div>
              
              <label className="block text-xs text-editor-muted mb-1">Image URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  className="flex-1 bg-editor-surface/80 backdrop-blur-sm border border-editor-border/60 rounded-lg text-sm text-editor-text px-3 py-2"
                />
                <button className="px-3 py-2 bg-cv-accent rounded-md text-white text-xs">
                  Add
                </button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="relative backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-xl -z-10"></div>
          <label className="block text-xs text-editor-muted mb-2 opacity-80">Background Effects</label>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-editor-muted">Blur Effect</label>
                <span className="text-xs text-editor-muted">{blurAmount}px</span>
              </div>
              <Slider 
                defaultValue={[0]} 
                max={20} 
                step={1} 
                value={[blurAmount]}
                onValueChange={handleBlurChange}
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-editor-muted">Opacity</label>
                <span className="text-xs text-editor-muted">100%</span>
              </div>
              <Slider defaultValue={[100]} max={100} step={1} />
            </div>
            
            <div className="pt-2">
              <div className="flex justify-between items-center">
                <div>
                  <label className="text-xs text-editor-muted block">3D Parallax Effect</label>
                  <span className="text-xs text-editor-muted opacity-60">Adds depth to background</span>
                </div>
                <Switch 
                  checked={enable3D}
                  onCheckedChange={handle3DToggle}
                />
              </div>
            </div>
          </div>
        </div>
        
        <ApplyToAllSites
          property="bannerBg"
          value={templateStyles.bannerBg}
          onApply={applyToAllSites}
        />
        
        <ApplyToAllSites
          property="enable3D"
          value={templateStyles.enable3D}
          onApply={applyToAllSites}
        />
      </div>
    </ScrollArea>
  );
};

export default BackgroundProperties;
