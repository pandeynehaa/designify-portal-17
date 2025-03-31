
import React, { useState } from "react";
import { PlusCircle, Palette, Droplet, Upload, Layers } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import ColorTab from "./background/ColorTab";
import GradientTab from "./background/GradientTab";
import ImageTab from "./background/ImageTab";
import EffectsTab from "./background/EffectsTab";

const BackgroundTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState("color");
  const [blurAmount, setBlurAmount] = useState(0);
  const [enable3D, setEnable3D] = useState(false);
  const [opacity, setOpacity] = useState(100);
  
  const handleApplySolidColor = (color: string) => {
    // This would be connected to the canvas state in a real implementation
    console.log("Applying solid color:", color);
  };
  
  const handleApplyGradient = (gradient: string) => {
    // This would be connected to the canvas state in a real implementation
    console.log("Applying gradient:", gradient);
  };
  
  const handleUploadImage = () => {
    // This would trigger a file upload in a real implementation
    console.log("Uploading image");
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
            <Droplet size={14} className="mr-1" />
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
          <ColorTab onColorSelect={handleApplySolidColor} />
        </TabsContent>
        
        <TabsContent value="gradient" className="mt-0">
          <GradientTab onGradientSelect={handleApplyGradient} />
        </TabsContent>
        
        <TabsContent value="image" className="mt-0">
          <ImageTab onImageUpload={handleUploadImage} />
        </TabsContent>
        
        <TabsContent value="effects" className="mt-0">
          <EffectsTab 
            blurAmount={blurAmount}
            opacity={opacity}
            enable3D={enable3D}
            onBlurChange={handleBlurChange}
            onOpacityChange={handleOpacityChange}
            on3DToggle={handle3DToggle}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BackgroundTab;
