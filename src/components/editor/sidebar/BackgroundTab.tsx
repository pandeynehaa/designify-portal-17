
import React, { useState } from "react";
import { 
  PlusCircle, Upload, Palette, PanelLeft, 
  Camera, Layers, DropletLine
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";

const GRADIENT_PRESETS = [
  "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
  "linear-gradient(to top, #e6b980 0%, #eacda3 100%)",
  "linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)",
  "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)",
  "linear-gradient(90deg, hsla(39, 100%, 77%, 1) 0%, hsla(22, 90%, 57%, 1) 100%)",
  "linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)",
  "linear-gradient(to right, #243949 0%, #517fa4 100%)",
];

const SOLID_COLORS = [
  "#1A1F2C", "#6E59A5", "#8E9196", "#7E69AB", "#9b87f5", 
  "#F2FCE2", "#FEF7CD", "#FEC6A1", "#E5DEFF", "#FFDEE2"
];

const BackgroundTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState("color");
  const [blurAmount, setBlurAmount] = useState(0);
  const [enable3D, setEnable3D] = useState(false);
  const [opacity, setOpacity] = useState(100);
  
  const handleApplySolidColor = (color: string) => {
    // This would be connected to the canvas state in a real implementation
    console.log("Applying solid color:", color);
    toast({
      title: "Background Updated",
      description: `Solid color ${color} applied to the background`
    });
  };
  
  const handleApplyGradient = (gradient: string) => {
    // This would be connected to the canvas state in a real implementation
    console.log("Applying gradient:", gradient);
    toast({
      title: "Background Updated",
      description: "Gradient applied to the background"
    });
  };
  
  const handleUploadImage = () => {
    // This would trigger a file upload in a real implementation
    toast({
      title: "Upload Background",
      description: "Image upload feature will be available soon"
    });
  };
  
  const handleBlurChange = (value: number[]) => {
    setBlurAmount(value[0]);
    // This would be connected to the canvas state in a real implementation
    console.log("Setting blur amount:", value[0]);
  };
  
  const handleOpacityChange = (value: number[]) => {
    setOpacity(value[0]);
    // This would be connected to the canvas state in a real implementation
    console.log("Setting opacity:", value[0]);
  };
  
  const handle3DToggle = (checked: boolean) => {
    setEnable3D(checked);
    // This would be connected to the canvas state in a real implementation
    console.log("3D effect toggled:", checked);
    toast({
      title: checked ? "3D Effects Enabled" : "3D Effects Disabled",
      description: checked 
        ? "3D parallax effects are now active on your background" 
        : "3D parallax effects have been turned off"
    });
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-cv-white">Background Design</h3>
        <button 
          className="p-1 text-xs bg-cv-accent rounded-md text-cv-white hover:bg-cv-purple transition-colors"
          onClick={() => toast({
            title: "Create New Background",
            description: "Creating a new background from scratch"
          })}
        >
          <PlusCircle size={14} className="mr-1 inline-block" />
          <span>New</span>
        </button>
      </div>
      
      <Tabs defaultValue="color" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 h-auto mb-4 bg-cv-darkgray">
          <TabsTrigger 
            value="color" 
            className="text-xs py-1.5 data-[state=active]:bg-cv-accent"
          >
            <Palette size={14} className="mr-1" />
            Color
          </TabsTrigger>
          <TabsTrigger 
            value="gradient" 
            className="text-xs py-1.5 data-[state=active]:bg-cv-accent"
          >
            <DropletLine size={14} className="mr-1" />
            Gradient
          </TabsTrigger>
          <TabsTrigger 
            value="image" 
            className="text-xs py-1.5 data-[state=active]:bg-cv-accent"
          >
            <Upload size={14} className="mr-1" />
            Upload
          </TabsTrigger>
          <TabsTrigger 
            value="effects" 
            className="text-xs py-1.5 data-[state=active]:bg-cv-accent"
          >
            <Layers size={14} className="mr-1" />
            Effects
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="color" className="mt-0">
          <div className="grid grid-cols-5 gap-2 mb-4">
            {SOLID_COLORS.map((color, index) => (
              <div 
                key={index}
                className="w-full aspect-square rounded-md cursor-pointer hover:ring-2 hover:ring-cv-accent transition-all"
                style={{ background: color }}
                onClick={() => handleApplySolidColor(color)}
                title={color}
              />
            ))}
          </div>
          
          <div className="bg-cv-darkgray/50 rounded-md p-3 backdrop-blur-sm">
            <label className="block text-xs text-cv-white mb-1">Custom Color</label>
            <div className="flex gap-2">
              <input 
                type="color" 
                className="w-10 h-10 rounded cursor-pointer" 
                onChange={(e) => handleApplySolidColor(e.target.value)}
              />
              <input
                type="text"
                placeholder="#RRGGBB"
                className="flex-1 bg-cv-gray border border-cv-lightgray rounded px-2 py-1 text-sm text-cv-white"
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="gradient" className="mt-0">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {GRADIENT_PRESETS.map((gradient, index) => (
              <div 
                key={index}
                className="h-20 rounded-md cursor-pointer hover:ring-2 hover:ring-cv-accent transition-all"
                style={{ background: gradient }}
                onClick={() => handleApplyGradient(gradient)}
              />
            ))}
          </div>
          
          <div className="bg-cv-darkgray/50 rounded-md p-3 backdrop-blur-sm">
            <label className="block text-xs text-cv-white mb-1">Custom Gradient</label>
            <input
              type="text"
              placeholder="linear-gradient(...)"
              className="w-full bg-cv-gray border border-cv-lightgray rounded px-2 py-1 text-sm text-cv-white"
            />
            <div className="flex gap-2 mt-2">
              <div className="flex items-center gap-1">
                <label className="text-xs text-cv-white">Start:</label>
                <input type="color" className="w-8 h-8 rounded cursor-pointer" />
              </div>
              <div className="flex items-center gap-1">
                <label className="text-xs text-cv-white">End:</label>
                <input type="color" className="w-8 h-8 rounded cursor-pointer" />
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="image" className="mt-0">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-cv-lightgray rounded-md p-6 mb-4">
            <Upload size={24} className="text-cv-white mb-2" />
            <p className="text-sm text-cv-white mb-2">Upload Background Image</p>
            <p className="text-xs text-cv-lightgray mb-4">PNG, JPG, WEBP up to 5MB</p>
            <button 
              className="px-4 py-2 bg-cv-purple rounded-md text-white text-sm hover:bg-cv-accent transition-colors"
              onClick={handleUploadImage}
            >
              Choose File
            </button>
          </div>
          
          <div className="bg-cv-darkgray/50 rounded-md p-3 backdrop-blur-sm">
            <label className="block text-xs text-cv-white mb-1">Image URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                className="flex-1 bg-cv-gray border border-cv-lightgray rounded px-2 py-1 text-sm text-cv-white"
              />
              <button 
                className="px-2 py-1 bg-cv-accent rounded text-white text-xs"
                onClick={() => toast({
                  title: "URL Added",
                  description: "Background image from URL has been applied"
                })}
              >
                Add
              </button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="effects" className="mt-0">
          <div className="space-y-4">
            <div className="bg-cv-darkgray/50 rounded-md p-3 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-cv-white">Blur Effect</label>
                <span className="text-xs text-cv-lightgray">{blurAmount}px</span>
              </div>
              <Slider 
                defaultValue={[0]} 
                max={20} 
                step={1} 
                value={[blurAmount]}
                onValueChange={handleBlurChange}
              />
            </div>
            
            <div className="bg-cv-darkgray/50 rounded-md p-3 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-cv-white">Opacity</label>
                <span className="text-xs text-cv-lightgray">{opacity}%</span>
              </div>
              <Slider 
                defaultValue={[100]} 
                max={100} 
                step={1}
                value={[opacity]}
                onValueChange={handleOpacityChange}
              />
            </div>
            
            <div className="bg-cv-darkgray/50 rounded-md p-3 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <div>
                  <label className="text-xs text-cv-white block">3D Parallax Effect</label>
                  <span className="text-xs text-cv-lightgray">Adds depth to background</span>
                </div>
                <Switch 
                  checked={enable3D}
                  onCheckedChange={handle3DToggle}
                />
              </div>
            </div>
            
            <div className="bg-cv-darkgray/50 rounded-md p-3 backdrop-blur-sm">
              <button 
                className="w-full px-3 py-2 bg-cv-accent rounded-md text-white text-sm hover:bg-cv-purple transition-colors"
                onClick={() => toast({
                  title: "Effects Applied",
                  description: "All background effects have been applied"
                })}
              >
                Apply Effects
              </button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackgroundTab;
