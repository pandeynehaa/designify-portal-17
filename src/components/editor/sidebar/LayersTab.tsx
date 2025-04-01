
import React from "react";
import LayersPanel from "./LayersPanel";
import { ScrollArea } from "@/components/ui/scroll-area";

const LayersTab: React.FC = () => {
  return (
    <ScrollArea className="h-full">
      <LayersPanel />
    </ScrollArea>
  );
};

export default LayersTab;
