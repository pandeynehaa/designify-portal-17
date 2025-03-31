
import React from "react";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from "@/components/ui/menubar";
import { Type, ImageIcon, Layers, Square, Circle, Triangle, Video, FileText, Box } from "lucide-react";

interface InsertMenuProps {
  onInsertText: () => void;
  onInsertImage: () => void;
  onInsertComponent: () => void;
}

const InsertMenu: React.FC<InsertMenuProps> = ({
  onInsertText,
  onInsertImage,
  onInsertComponent
}) => {
  return (
    <Menubar className="bg-transparent border-none p-0">
      <MenubarMenu>
        <MenubarTrigger className="px-2 hover:bg-cv-lightgray text-cv-white">Insert</MenubarTrigger>
        <MenubarContent className="bg-cv-darkgray border border-cv-lightgray">
          <MenubarItem className="text-cv-white hover:bg-cv-lightgray cursor-pointer" onClick={onInsertText}>
            <Type className="mr-2 h-4 w-4" />
            <span>Text</span>
          </MenubarItem>
          
          <MenubarItem className="text-cv-white hover:bg-cv-lightgray cursor-pointer" onClick={onInsertImage}>
            <ImageIcon className="mr-2 h-4 w-4" />
            <span>Image</span>
          </MenubarItem>
          
          <MenubarSeparator className="bg-cv-lightgray/30" />
          
          <MenubarItem className="text-cv-white hover:bg-cv-lightgray cursor-pointer" onClick={onInsertComponent}>
            <Box className="mr-2 h-4 w-4" />
            <span>Container</span>
          </MenubarItem>
          
          <MenubarItem className="text-cv-white hover:bg-cv-lightgray cursor-pointer">
            <Layers className="mr-2 h-4 w-4" />
            <span>Component</span>
          </MenubarItem>
          
          <MenubarSeparator className="bg-cv-lightgray/30" />
          
          <MenubarItem className="text-cv-white hover:bg-cv-lightgray cursor-pointer">
            <Square className="mr-2 h-4 w-4" />
            <span>Rectangle</span>
          </MenubarItem>
          
          <MenubarItem className="text-cv-white hover:bg-cv-lightgray cursor-pointer">
            <Circle className="mr-2 h-4 w-4" />
            <span>Circle</span>
          </MenubarItem>
          
          <MenubarItem className="text-cv-white hover:bg-cv-lightgray cursor-pointer">
            <Triangle className="mr-2 h-4 w-4" />
            <span>Triangle</span>
          </MenubarItem>
          
          <MenubarSeparator className="bg-cv-lightgray/30" />
          
          <MenubarItem className="text-cv-white hover:bg-cv-lightgray cursor-pointer">
            <Video className="mr-2 h-4 w-4" />
            <span>Video</span>
          </MenubarItem>
          
          <MenubarItem className="text-cv-white hover:bg-cv-lightgray cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            <span>Embed</span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default InsertMenu;
