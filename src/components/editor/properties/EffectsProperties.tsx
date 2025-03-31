
import React from "react";
import { ChevronDown, X } from "lucide-react";

const EffectsProperties: React.FC = () => (
  <div className="p-4 space-y-6">
    <div className="relative backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl -z-10"></div>
      <label className="block text-xs text-editor-muted mb-2 opacity-80">Shadow</label>
      <div className="flex space-x-2 mb-3">
        <select className="flex-1 bg-editor-surface/80 backdrop-blur-sm border border-editor-border/60 rounded-lg text-sm text-editor-text px-3 py-2 transition-all hover:bg-editor-surface/90">
          <option>Small</option>
          <option>Medium</option>
          <option>Large</option>
          <option>Custom</option>
        </select>
        <button className="bg-editor-surface/80 backdrop-blur-sm border border-editor-border/60 rounded-lg px-3 py-2 transition-all hover:bg-editor-surface/90">
          <ChevronDown size={14} className="text-editor-text" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-editor-muted opacity-80">X Offset</label>
          <input
            type="text"
            value="0px"
            className="w-full bg-editor-surface/80 backdrop-blur-sm border border-editor-border/60 rounded-lg text-sm text-editor-text px-3 py-2 mt-1 transition-all focus:ring-2 focus:ring-cv-purple/30"
          />
        </div>
        <div>
          <label className="block text-xs text-editor-muted opacity-80">Y Offset</label>
          <input
            type="text"
            value="4px"
            className="w-full bg-editor-surface/80 backdrop-blur-sm border border-editor-border/60 rounded-lg text-sm text-editor-text px-3 py-2 mt-1 transition-all focus:ring-2 focus:ring-cv-purple/30"
          />
        </div>
        <div>
          <label className="block text-xs text-editor-muted opacity-80">Blur</label>
          <input
            type="text"
            value="8px"
            className="w-full bg-editor-surface/80 backdrop-blur-sm border border-editor-border/60 rounded-lg text-sm text-editor-text px-3 py-2 mt-1 transition-all focus:ring-2 focus:ring-cv-purple/30"
          />
        </div>
        <div>
          <label className="block text-xs text-editor-muted opacity-80">Spread</label>
          <input
            type="text"
            value="0px"
            className="w-full bg-editor-surface/80 backdrop-blur-sm border border-editor-border/60 rounded-lg text-sm text-editor-text px-3 py-2 mt-1 transition-all focus:ring-2 focus:ring-cv-purple/30"
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="block text-xs text-editor-muted mb-1 opacity-80">Color</label>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg bg-black/20 border border-editor-border/60 shadow-inner"></div>
          <input
            type="text"
            value="rgba(0,0,0,0.2)"
            className="ml-2 flex-1 bg-editor-surface/80 backdrop-blur-sm border border-editor-border/60 rounded-lg text-sm text-editor-text px-3 py-2 transition-all focus:ring-2 focus:ring-cv-purple/30"
          />
        </div>
      </div>
    </div>
    
    <div className="relative backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-xl -z-10"></div>
      <label className="block text-xs text-editor-muted mb-2 opacity-80">Opacity</label>
      <div className="flex items-center space-x-3">
        <div className="flex-1 bg-editor-surface/40 h-2 rounded-full overflow-hidden">
          <div className="bg-cv-purple h-2 rounded-full w-full"></div>
        </div>
        <input
          type="text"
          value="100%"
          className="w-16 bg-editor-surface/80 backdrop-blur-sm border border-editor-border/60 rounded-lg text-xs text-editor-text px-2 py-1 text-center transition-all focus:ring-2 focus:ring-cv-purple/30"
        />
      </div>
    </div>
    
    <div className="relative backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl -z-10"></div>
      <label className="block text-xs text-editor-muted mb-2 opacity-80">Blur</label>
      <div className="flex items-center space-x-3">
        <div className="flex-1 bg-editor-surface/40 h-2 rounded-full">
          <div className="bg-cv-purple h-2 rounded-full w-0"></div>
        </div>
        <input
          type="text"
          value="0px"
          className="w-16 bg-editor-surface/80 backdrop-blur-sm border border-editor-border/60 rounded-lg text-xs text-editor-text px-2 py-1 text-center transition-all focus:ring-2 focus:ring-cv-purple/30"
        />
      </div>
    </div>
    
    <div className="relative backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-xl -z-10"></div>
      <label className="block text-xs text-editor-muted mb-2 opacity-80">Blend Mode</label>
      <select className="w-full bg-editor-surface/80 backdrop-blur-sm border border-editor-border/60 rounded-lg text-sm text-editor-text px-3 py-2 transition-all focus:ring-2 focus:ring-cv-purple/30">
        <option>Normal</option>
        <option>Multiply</option>
        <option>Screen</option>
        <option>Overlay</option>
        <option>Darken</option>
        <option>Lighten</option>
      </select>
    </div>
    
    <div className="relative backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl -z-10"></div>
      <label className="block text-xs text-editor-muted mb-2 opacity-80">Transforms</label>
      <button className="w-full py-2 px-3 bg-cv-purple/80 backdrop-blur-sm text-white rounded-lg text-xs shadow-inner mb-3 hover:bg-cv-purple transition-all focus:outline-none focus:ring-2 focus:ring-cv-purple/50">
        Add Transform
      </button>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between p-3 bg-editor-surface/60 backdrop-blur-sm rounded-lg border border-editor-border/40 shadow-sm hover:shadow transition-shadow">
          <span className="text-xs text-editor-text">Rotate: 0°</span>
          <X size={14} className="text-editor-muted cursor-pointer hover:text-white transition-colors" />
        </div>
        <div className="flex items-center justify-between p-3 bg-editor-surface/60 backdrop-blur-sm rounded-lg border border-editor-border/40 shadow-sm hover:shadow transition-shadow">
          <span className="text-xs text-editor-text">Scale: 1</span>
          <X size={14} className="text-editor-muted cursor-pointer hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
);

export default EffectsProperties;
