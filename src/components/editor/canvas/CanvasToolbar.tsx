
import React from "react";
import { Edit, Crop, MousePointer, Move, Grid as GridIcon, Eye } from "lucide-react";
import DeviceToolbar from "../DeviceToolbar";
import ZoomControls from "../ZoomControls";
import InsertMenu from "./InsertMenu";

interface CanvasToolbarProps {
  deviceView: string;
  setDeviceView: (view: string) => void;
  activeTool: string;
  setActiveTool: (tool: string) => void;
  zoomLevel: number;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
  showGrid: boolean;
  toggleGrid: () => void;
  editMode: boolean;
  toggleEditMode: () => void;
  onInsertText: () => void;
  onInsertImage: () => void;
  onInsertComponent: () => void;
}

const CanvasToolbar: React.FC<CanvasToolbarProps> = ({
  deviceView,
  setDeviceView,
  activeTool,
  setActiveTool,
  zoomLevel,
  handleZoomIn,
  handleZoomOut,
  showGrid,
  toggleGrid,
  editMode,
  toggleEditMode,
  onInsertText,
  onInsertImage,
  onInsertComponent
}) => {
  return (
    <div className="editor-toolbar justify-between">
      <div className="flex items-center space-x-2">
        <DeviceToolbar 
          deviceView={deviceView}
          setDeviceView={setDeviceView}
          activeTool={activeTool}
          setActiveTool={setActiveTool}
        />
        
        <div className="h-6 border-r border-cv-lightgray mx-1"></div>
        
        <InsertMenu 
          onInsertText={onInsertText}
          onInsertImage={onInsertImage}
          onInsertComponent={onInsertComponent}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <button 
          className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${activeTool === 'select' ? 'bg-cv-accent text-cv-white' : 'text-cv-white hover:bg-cv-lightgray'}`}
          onClick={() => setActiveTool('select')}
        >
          <MousePointer size={14} />
        </button>
        <button 
          className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${activeTool === 'edit' ? 'bg-cv-accent text-cv-white' : 'text-cv-white hover:bg-cv-lightgray'}`}
          onClick={() => setActiveTool('edit')}
        >
          <Edit size={14} />
        </button>
        <button 
          className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${activeTool === 'move' ? 'bg-cv-accent text-cv-white' : 'text-cv-white hover:bg-cv-lightgray'}`}
          onClick={() => setActiveTool('move')}
        >
          <Move size={14} />
        </button>
        <button 
          className={`px-2 py-1 rounded-md text-xs font-medium transition-colors ${activeTool === 'crop' ? 'bg-cv-accent text-cv-white' : 'text-cv-white hover:bg-cv-lightgray'}`}
          onClick={() => setActiveTool('crop')}
        >
          <Crop size={14} />
        </button>
        
        <div className="h-5 border-r border-cv-lightgray mx-1"></div>
        
        <button
          className={`px-2 py-1 rounded-md text-xs font-medium transition-colors text-cv-white hover:bg-cv-lightgray ${showGrid ? 'bg-cv-lightgray' : ''}`}
          onClick={toggleGrid}
          title="Toggle Grid"
        >
          Grid
        </button>
        
        <button
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${!editMode ? 'bg-cv-accent text-cv-white' : 'bg-cv-darkgray text-cv-white hover:bg-cv-lightgray'}`}
          onClick={toggleEditMode}
          title="Toggle Edit Mode"
        >
          {editMode ? (
            <>
              <Eye size={14} />
              <span>Preview</span>
            </>
          ) : (
            <>
              <Edit size={14} />
              <span>Edit</span>
            </>
          )}
        </button>
      </div>
      
      <ZoomControls 
        zoomLevel={zoomLevel}
        handleZoomIn={handleZoomIn}
        handleZoomOut={handleZoomOut}
      />
    </div>
  );
};

export default CanvasToolbar;
