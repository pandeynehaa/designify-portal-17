
import React from "react";
import { ChevronDown, X } from "lucide-react";

const EffectsProperties: React.FC = () => (
  <div className="p-4 space-y-4">
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Shadow</label>
      <div className="flex space-x-2 mb-2">
        <select className="flex-1 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
          <option>Custom</option>
        </select>
        <button className="bg-editor-surface border border-editor-border rounded-md px-3 py-2">
          <ChevronDown size={14} className="text-editor-text" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-editor-muted">X Offset</label>
          <input
            type="text"
            value="0px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-2 py-2"
          />
        </div>
        <div>
          <label className="block text-xs text-editor-muted">Y Offset</label>
          <input
            type="text"
            value="4px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-2 py-2"
          />
        </div>
        <div>
          <label className="block text-xs text-editor-muted">Blur</label>
          <input
            type="text"
            value="8px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-2 py-2"
          />
        </div>
        <div>
          <label className="block text-xs text-editor-muted">Spread</label>
          <input
            type="text"
            value="0px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-2 py-2"
          />
        </div>
      </div>
      <div className="mt-2">
        <label className="block text-xs text-editor-muted mb-1">Color</label>
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-md bg-black/20 border border-editor-border"></div>
          <input
            type="text"
            value="rgba(0,0,0,0.2)"
            className="ml-2 flex-1 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-1"
          />
        </div>
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Opacity</label>
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-editor-surface h-1 rounded-full">
          <div className="bg-blue-500 h-1 rounded-full w-full"></div>
        </div>
        <input
          type="text"
          value="100%"
          className="w-16 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-1 text-center"
        />
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Blur</label>
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-editor-surface h-1 rounded-full">
          <div className="bg-blue-500 h-1 rounded-full w-0"></div>
        </div>
        <input
          type="text"
          value="0px"
          className="w-16 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-1 text-center"
        />
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Blend Mode</label>
      <select className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
        <option>Normal</option>
        <option>Multiply</option>
        <option>Screen</option>
        <option>Overlay</option>
        <option>Darken</option>
        <option>Lighten</option>
      </select>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Transforms</label>
      <button className="editor-button w-full justify-center text-xs mb-2">
        Add Transform
      </button>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between p-2 bg-editor-surface rounded-md">
          <span className="text-xs text-editor-text">Rotate: 0°</span>
          <X size={12} className="text-editor-muted cursor-pointer" />
        </div>
        <div className="flex items-center justify-between p-2 bg-editor-surface rounded-md">
          <span className="text-xs text-editor-text">Scale: 1</span>
          <X size={12} className="text-editor-muted cursor-pointer" />
        </div>
      </div>
    </div>
  </div>
);

export default EffectsProperties;
