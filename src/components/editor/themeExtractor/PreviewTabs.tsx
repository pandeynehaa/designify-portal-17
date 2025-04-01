
import React from "react";
import { Palette, Type, Layout, FileImage } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ColorsTab from "./tabs/ColorsTab";
import TypographyTab from "./tabs/TypographyTab";
import LayoutTab from "./tabs/LayoutTab";
import AssetsTab from "./tabs/AssetsTab";

interface PreviewTabsProps {
  previewData: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const PreviewTabs: React.FC<PreviewTabsProps> = ({ 
  previewData, 
  activeTab, 
  setActiveTab 
}) => {
  if (!previewData) return null;
  
  return (
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
        
        <TabsContent value="colors">
          <ColorsTab previewData={previewData} />
        </TabsContent>
        
        <TabsContent value="typography">
          <TypographyTab previewData={previewData} />
        </TabsContent>
        
        <TabsContent value="layout">
          <LayoutTab previewData={previewData} />
        </TabsContent>
        
        <TabsContent value="assets">
          <AssetsTab previewData={previewData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PreviewTabs;
