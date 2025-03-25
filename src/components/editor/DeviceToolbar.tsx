
import React from "react";
import { Monitor, Smartphone, Tablet, MousePointer, Move } from "lucide-react";

interface DeviceToolbarProps {
  deviceView: string;
  setDeviceView: (view: string) => void;
  activeTool: string;
  setActiveTool: (tool: string) => void;
}

const DeviceToolbar: React.FC<DeviceToolbarProps> = ({
  deviceView,
  setDeviceView,
  activeTool,
  setActiveTool
}) => {
  return (
    <div className="flex items-center space-x-3">
      <button
        className={`p-1.5 rounded-md ${deviceView === "desktop" ? "bg-editor-highlight" : "hover:bg-editor-surface"} toolbar-button-hover`}
        onClick={() => setDeviceView("desktop")}
      >
        <Monitor size={16} className="text-editor-text" />
      </button>
      <button
        className={`p-1.5 rounded-md ${deviceView === "tablet" ? "bg-editor-highlight" : "hover:bg-editor-surface"} toolbar-button-hover`}
        onClick={() => setDeviceView("tablet")}
      >
        <Tablet size={16} className="text-editor-text" />
      </button>
      <button
        className={`p-1.5 rounded-md ${deviceView === "mobile" ? "bg-editor-highlight" : "hover:bg-editor-surface"} toolbar-button-hover`}
        onClick={() => setDeviceView("mobile")}
      >
        <Smartphone size={16} className="text-editor-text" />
      </button>
      
      <div className="h-4 border-r border-editor-border mx-1"></div>
      
      <button
        className={`p-1.5 rounded-md ${activeTool === "select" ? "bg-editor-highlight" : "hover:bg-editor-surface"} toolbar-button-hover`}
        onClick={() => setActiveTool("select")}
      >
        <MousePointer size={14} className="text-editor-text" />
      </button>
      <button
        className={`p-1.5 rounded-md ${activeTool === "move" ? "bg-editor-highlight" : "hover:bg-editor-surface"} toolbar-button-hover`}
        onClick={() => setActiveTool("move")}
      >
        <Move size={14} className="text-editor-text" />
      </button>
    </div>
  );
};

export default DeviceToolbar;
