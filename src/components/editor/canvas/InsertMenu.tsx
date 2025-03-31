
import React from "react";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem } from "@/components/ui/menubar";
import { Type, ImageIcon, Layers } from "lucide-react";

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
          <MenubarItem className="text-cv-white hover:bg-cv-lightgray cursor-pointer" onClick={onInsertComponent}>
            <Layers className="mr-2 h-4 w-4" />
            <span>Component</span>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default InsertMenu;
