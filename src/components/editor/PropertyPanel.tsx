
import React from "react";
import { X, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, ChevronDown } from "lucide-react";

interface PropertyPanelProps {
  activeTab: string;
  onClose: () => void;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({ activeTab, onClose }) => {
  return (
    <div className="editor-panel w-72 flex flex-col h-full">
      <div className="editor-toolbar justify-between">
        <span className="text-editor-text text-sm font-medium capitalize">{activeTab} Properties</span>
        <button className="editor-button p-1.5" onClick={onClose}>
          <X size={14} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {activeTab === "typography" && <TypographyProperties />}
        {activeTab === "colors" && <ColorProperties />}
        {activeTab === "images" && <ImageProperties />}
        {activeTab === "layout" && <LayoutProperties />}
        {activeTab === "effects" && <EffectsProperties />}
        {activeTab === "theme" && <ThemeProperties />}
      </div>
    </div>
  );
};

const TypographyProperties: React.FC = () => (
  <div className="p-4 space-y-4">
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Font Family</label>
      <div className="flex">
        <select className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
          <option>Inter</option>
          <option>SF Pro Display</option>
          <option>Roboto</option>
          <option>Poppins</option>
        </select>
      </div>
    </div>
    
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Size</label>
        <div className="flex">
          <input
            type="number"
            value="16"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
          />
          <select className="ml-2 w-20 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-2 py-2">
            <option>px</option>
            <option>rem</option>
            <option>em</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Weight</label>
        <select className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
          <option>Regular (400)</option>
          <option>Medium (500)</option>
          <option>Semi Bold (600)</option>
          <option>Bold (700)</option>
        </select>
      </div>
      
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Line Height</label>
        <div className="flex">
          <input
            type="number"
            value="1.5"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-xs text-editor-muted mb-1.5">Letter Spacing</label>
        <div className="flex">
          <input
            type="number"
            value="0"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
          />
          <select className="ml-2 w-20 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-2 py-2">
            <option>px</option>
            <option>em</option>
          </select>
        </div>
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Style</label>
      <div className="flex space-x-2">
        <button className="flex-1 bg-editor-highlight p-2 rounded-md flex items-center justify-center">
          <Bold size={16} className="text-editor-text" />
        </button>
        <button className="flex-1 bg-editor-surface p-2 rounded-md flex items-center justify-center">
          <Italic size={16} className="text-editor-text" />
        </button>
        <button className="flex-1 bg-editor-surface p-2 rounded-md flex items-center justify-center">
          <Underline size={16} className="text-editor-text" />
        </button>
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Alignment</label>
      <div className="flex space-x-2">
        <button className="flex-1 bg-editor-highlight p-2 rounded-md flex items-center justify-center">
          <AlignLeft size={16} className="text-editor-text" />
        </button>
        <button className="flex-1 bg-editor-surface p-2 rounded-md flex items-center justify-center">
          <AlignCenter size={16} className="text-editor-text" />
        </button>
        <button className="flex-1 bg-editor-surface p-2 rounded-md flex items-center justify-center">
          <AlignRight size={16} className="text-editor-text" />
        </button>
      </div>
    </div>
  </div>
);

const ColorProperties: React.FC = () => (
  <div className="p-4 space-y-4">
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Text Color</label>
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-md bg-blue-500 border border-editor-border"></div>
        <input
          type="text"
          value="#3B82F6"
          className="ml-2 flex-1 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
        />
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Background Color</label>
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-md bg-white border border-editor-border"></div>
        <input
          type="text"
          value="#FFFFFF"
          className="ml-2 flex-1 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
        />
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Brand Colors</label>
      <div className="grid grid-cols-6 gap-2 mb-2">
        <div className="w-8 h-8 rounded-md bg-blue-500 border border-editor-border"></div>
        <div className="w-8 h-8 rounded-md bg-blue-400 border border-editor-border"></div>
        <div className="w-8 h-8 rounded-md bg-blue-300 border border-editor-border"></div>
        <div className="w-8 h-8 rounded-md bg-gray-800 border border-editor-border"></div>
        <div className="w-8 h-8 rounded-md bg-gray-600 border border-editor-border"></div>
        <div className="w-8 h-8 rounded-md bg-gray-400 border border-editor-border"></div>
      </div>
      <button className="editor-button w-full justify-center text-xs">
        Add to Theme Colors
      </button>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Gradients</label>
      <div className="space-y-2 mb-2">
        <div className="h-8 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 border border-editor-border"></div>
        <div className="h-8 rounded-md bg-gradient-to-r from-green-400 to-blue-500 border border-editor-border"></div>
        <div className="h-8 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 border border-editor-border"></div>
      </div>
      <button className="editor-button w-full justify-center text-xs">
        Create Custom Gradient
      </button>
    </div>
  </div>
);

const ImageProperties: React.FC = () => (
  <div className="p-4 space-y-4">
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Image Source</label>
      <div className="flex">
        <input
          type="text"
          value="assets/image.jpg"
          className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
          placeholder="URL or file path"
        />
      </div>
      <div className="mt-2 flex space-x-2">
        <button className="editor-button flex-1 justify-center text-xs">
          Replace
        </button>
        <button className="editor-button flex-1 justify-center text-xs">
          Upload
        </button>
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Dimensions</label>
      <div className="flex space-x-2">
        <div className="flex-1">
          <label className="block text-xs text-editor-muted">Width</label>
          <input
            type="text"
            value="300"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-editor-muted">Height</label>
          <input
            type="text"
            value="200"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
          />
        </div>
      </div>
      <div className="mt-2">
        <label className="inline-flex items-center">
          <input type="checkbox" className="bg-editor-surface border-editor-border rounded mr-2" checked />
          <span className="text-xs text-editor-text">Maintain aspect ratio</span>
        </label>
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Image Effects</label>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-editor-text">Opacity</span>
          <div className="w-24 bg-editor-surface h-1 rounded-full">
            <div className="bg-blue-500 h-1 rounded-full w-3/4"></div>
          </div>
          <input
            type="text"
            value="75%"
            className="w-12 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-1 text-center"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-editor-text">Blur</span>
          <div className="w-24 bg-editor-surface h-1 rounded-full">
            <div className="bg-blue-500 h-1 rounded-full w-1/4"></div>
          </div>
          <input
            type="text"
            value="2px"
            className="w-12 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-1 text-center"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-editor-text">Brightness</span>
          <div className="w-24 bg-editor-surface h-1 rounded-full">
            <div className="bg-blue-500 h-1 rounded-full w-1/2"></div>
          </div>
          <input
            type="text"
            value="100%"
            className="w-12 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-1 text-center"
          />
        </div>
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Border Radius</label>
      <input
        type="text"
        value="8px"
        className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
      />
    </div>
  </div>
);

const LayoutProperties: React.FC = () => (
  <div className="p-4 space-y-4">
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Position</label>
      <div className="flex space-x-2">
        <div className="flex-1">
          <label className="block text-xs text-editor-muted">X</label>
          <input
            type="text"
            value="20px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-editor-muted">Y</label>
          <input
            type="text"
            value="40px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
          />
        </div>
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Size</label>
      <div className="flex space-x-2">
        <div className="flex-1">
          <label className="block text-xs text-editor-muted">Width</label>
          <input
            type="text"
            value="300px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-editor-muted">Height</label>
          <input
            type="text"
            value="auto"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
          />
        </div>
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Margin</label>
      <div className="grid grid-cols-4 gap-2">
        <div>
          <label className="block text-xs text-editor-muted">Top</label>
          <input
            type="text"
            value="20px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-2 py-2"
          />
        </div>
        <div>
          <label className="block text-xs text-editor-muted">Right</label>
          <input
            type="text"
            value="10px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-2 py-2"
          />
        </div>
        <div>
          <label className="block text-xs text-editor-muted">Bottom</label>
          <input
            type="text"
            value="20px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-2 py-2"
          />
        </div>
        <div>
          <label className="block text-xs text-editor-muted">Left</label>
          <input
            type="text"
            value="10px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-2 py-2"
          />
        </div>
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Padding</label>
      <div className="grid grid-cols-4 gap-2">
        <div>
          <label className="block text-xs text-editor-muted">Top</label>
          <input
            type="text"
            value="16px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-2 py-2"
          />
        </div>
        <div>
          <label className="block text-xs text-editor-muted">Right</label>
          <input
            type="text"
            value="16px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-2 py-2"
          />
        </div>
        <div>
          <label className="block text-xs text-editor-muted">Bottom</label>
          <input
            type="text"
            value="16px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-2 py-2"
          />
        </div>
        <div>
          <label className="block text-xs text-editor-muted">Left</label>
          <input
            type="text"
            value="16px"
            className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-2 py-2"
          />
        </div>
      </div>
    </div>
  </div>
);

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

const ThemeProperties: React.FC = () => (
  <div className="p-4 space-y-4">
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Theme Name</label>
      <input
        type="text"
        value="Modern Web3"
        className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
      />
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Primary Colors</label>
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-blue-500 border border-editor-border"></div>
          <div className="ml-2">
            <div className="text-xs text-editor-text">Primary</div>
            <input
              type="text"
              value="#3B82F6"
              className="w-20 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-0.5 text-center"
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-blue-400 border border-editor-border"></div>
          <div className="ml-2">
            <div className="text-xs text-editor-text">Secondary</div>
            <input
              type="text"
              value="#60A5FA"
              className="w-20 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-0.5 text-center"
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-amber-500 border border-editor-border"></div>
          <div className="ml-2">
            <div className="text-xs text-editor-text">Accent</div>
            <input
              type="text"
              value="#F59E0B"
              className="w-20 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-0.5 text-center"
            />
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Neutral Colors</label>
      <div className="space-y-2">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-gray-900 border border-editor-border"></div>
          <div className="ml-2">
            <div className="text-xs text-editor-text">Background (Dark)</div>
            <input
              type="text"
              value="#111827"
              className="w-20 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-0.5 text-center"
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-white border border-editor-border"></div>
          <div className="ml-2">
            <div className="text-xs text-editor-text">Background (Light)</div>
            <input
              type="text"
              value="#FFFFFF"
              className="w-20 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-0.5 text-center"
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-gray-700 border border-editor-border"></div>
          <div className="ml-2">
            <div className="text-xs text-editor-text">Text (Dark)</div>
            <input
              type="text"
              value="#374151"
              className="w-20 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-0.5 text-center"
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-md bg-gray-200 border border-editor-border"></div>
          <div className="ml-2">
            <div className="text-xs text-editor-text">Border</div>
            <input
              type="text"
              value="#E5E7EB"
              className="w-20 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-0.5 text-center"
            />
          </div>
        </div>
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Typography</label>
      <div className="space-y-2">
        <select className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2 mb-2">
          <option>Inter</option>
          <option>SF Pro Display</option>
          <option>Roboto</option>
          <option>Poppins</option>
        </select>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-editor-text">Heading Size Scale</span>
          <select className="w-20 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-1">
            <option>1.25</option>
            <option>1.333</option>
            <option>1.414</option>
            <option>1.5</option>
          </select>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-editor-text">Base Font Size</span>
          <select className="w-20 bg-editor-surface border border-editor-border rounded-md text-xs text-editor-text px-2 py-1">
            <option>14px</option>
            <option>16px</option>
            <option>18px</option>
          </select>
        </div>
      </div>
    </div>
    
    <div>
      <label className="block text-xs text-editor-muted mb-1.5">Border Radius</label>
      <select className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
        <option>None (0px)</option>
        <option>Small (4px)</option>
        <option>Medium (8px)</option>
        <option>Large (12px)</option>
        <option>XL (16px)</option>
        <option>2XL (24px)</option>
        <option>Full (9999px)</option>
      </select>
    </div>
    
    <div>
      <button className="editor-button-primary w-full justify-center text-sm">
        Apply Theme to Template
      </button>
    </div>
    
    <div>
      <button className="editor-button w-full justify-center text-sm">
        Save Theme to Library
      </button>
    </div>
  </div>
);

export default PropertyPanel;
