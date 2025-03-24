
import React, { useState } from "react";
import { X, Save, Upload, Download, ArrowRight, Plus, Trash2 } from "lucide-react";

interface ThemeMapperProps {
  onClose: () => void;
  onApply: (themeData: any) => void;
}

const ThemeMapper: React.FC<ThemeMapperProps> = ({ onClose, onApply }) => {
  const [activeTab, setActiveTab] = useState("colors");
  const [themeName, setThemeName] = useState("My Web3 Theme");
  
  const tabs = [
    { id: "colors", label: "Colors" },
    { id: "typography", label: "Typography" },
    { id: "components", label: "Components" },
    { id: "spacing", label: "Spacing" },
  ];
  
  // Sample theme data
  const themeData = {
    name: themeName,
    colors: {
      primary: "#3B82F6",
      secondary: "#60A5FA",
      accent: "#F59E0B",
      background: {
        dark: "#111827",
        light: "#FFFFFF",
      },
      text: {
        dark: "#374151",
        light: "#FFFFFF",
      },
      border: "#E5E7EB",
    },
    typography: {
      fontFamily: "Inter",
      sizeScale: 1.333,
      baseSize: "16px",
    },
    borderRadius: "8px",
    shadows: {
      small: "0 1px 3px rgba(0,0,0,0.1)",
      medium: "0 4px 6px rgba(0,0,0,0.1)",
      large: "0 10px 15px rgba(0,0,0,0.1)",
    },
  };
  
  const handleApply = () => {
    onApply(themeData);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-editor-panel rounded-lg shadow-xl overflow-hidden w-full max-w-4xl animate-scale-in">
        <div className="editor-toolbar justify-between">
          <span className="text-editor-text text-sm font-medium">Theme Mapper</span>
          <div className="flex items-center space-x-2">
            <button className="editor-button p-1.5">
              <Save size={14} className="text-editor-text" />
            </button>
            <button className="editor-button p-1.5">
              <Upload size={14} className="text-editor-text" />
            </button>
            <button className="editor-button p-1.5">
              <Download size={14} className="text-editor-text" />
            </button>
            <button className="editor-button p-1.5" onClick={onClose}>
              <X size={14} className="text-editor-text" />
            </button>
          </div>
        </div>
        
        <div className="flex h-[600px]">
          <div className="w-64 border-r border-editor-border overflow-y-auto">
            <div className="p-4">
              <label className="block text-xs text-editor-muted mb-1.5">Theme Name</label>
              <input
                type="text"
                value={themeName}
                onChange={(e) => setThemeName(e.target.value)}
                className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2 mb-4"
              />
              
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-editor-accent text-white"
                        : "text-editor-text hover:bg-editor-surface"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="border-t border-editor-border p-4">
              <div className="text-xs text-editor-muted mb-2">Preset Themes</div>
              <div className="space-y-2">
                <div className="p-2 rounded-md border border-editor-border hover:bg-editor-surface cursor-pointer">
                  <div className="text-xs font-medium text-editor-text mb-1.5">Modern Web3</div>
                  <div className="flex space-x-1">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-800"></div>
                  </div>
                </div>
                <div className="p-2 rounded-md border border-editor-border hover:bg-editor-surface cursor-pointer">
                  <div className="text-xs font-medium text-editor-text mb-1.5">Crypto Dark</div>
                  <div className="flex space-x-1">
                    <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                    <div className="w-4 h-4 rounded-full bg-pink-400"></div>
                    <div className="w-4 h-4 rounded-full bg-cyan-400"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-900"></div>
                  </div>
                </div>
                <div className="p-2 rounded-md border border-editor-border hover:bg-editor-surface cursor-pointer">
                  <div className="text-xs font-medium text-editor-text mb-1.5">NFT Minimal</div>
                  <div className="flex space-x-1">
                    <div className="w-4 h-4 rounded-full bg-gray-900"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-700"></div>
                    <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                    <div className="w-4 h-4 rounded-full bg-white border border-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {activeTab === "colors" && (
              <div className="p-6">
                <h3 className="text-editor-text text-base font-medium mb-4">Brand Colors</h3>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Primary</label>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md mr-2" style={{ backgroundColor: themeData.colors.primary }}></div>
                      <input
                        type="text"
                        value={themeData.colors.primary}
                        className="flex-1 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Secondary</label>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md mr-2" style={{ backgroundColor: themeData.colors.secondary }}></div>
                      <input
                        type="text"
                        value={themeData.colors.secondary}
                        className="flex-1 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Accent</label>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md mr-2" style={{ backgroundColor: themeData.colors.accent }}></div>
                      <input
                        type="text"
                        value={themeData.colors.accent}
                        className="flex-1 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Custom</label>
                    <button className="w-full flex items-center justify-center bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
                      <Plus size={14} className="mr-2" />
                      Add Custom Color
                    </button>
                  </div>
                </div>
                
                <h3 className="text-editor-text text-base font-medium mb-4">UI Colors</h3>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Background (Light)</label>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md mr-2 border border-editor-border" style={{ backgroundColor: themeData.colors.background.light }}></div>
                      <input
                        type="text"
                        value={themeData.colors.background.light}
                        className="flex-1 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Background (Dark)</label>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md mr-2" style={{ backgroundColor: themeData.colors.background.dark }}></div>
                      <input
                        type="text"
                        value={themeData.colors.background.dark}
                        className="flex-1 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Text (Dark)</label>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md mr-2" style={{ backgroundColor: themeData.colors.text.dark }}></div>
                      <input
                        type="text"
                        value={themeData.colors.text.dark}
                        className="flex-1 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Text (Light)</label>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md mr-2 border border-editor-border" style={{ backgroundColor: themeData.colors.text.light }}></div>
                      <input
                        type="text"
                        value={themeData.colors.text.light}
                        className="flex-1 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Border</label>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md mr-2 border border-editor-border" style={{ backgroundColor: themeData.colors.border }}></div>
                      <input
                        type="text"
                        value={themeData.colors.border}
                        className="flex-1 bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2"
                      />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-editor-text text-base font-medium mb-4">Gradient Presets</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="h-16 rounded-md bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <div className="h-16 rounded-md bg-gradient-to-r from-green-400 to-cyan-500"></div>
                  <div className="h-16 rounded-md bg-gradient-to-r from-pink-500 to-yellow-500"></div>
                  <button className="h-16 flex items-center justify-center border border-dashed border-editor-border rounded-md text-sm text-editor-muted">
                    <Plus size={16} className="mr-2" />
                    Add Custom Gradient
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === "typography" && (
              <div className="p-6">
                <h3 className="text-editor-text text-base font-medium mb-4">Font Settings</h3>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Primary Font</label>
                    <select className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
                      <option>Inter</option>
                      <option>SF Pro Display</option>
                      <option>Roboto</option>
                      <option>Poppins</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Secondary Font</label>
                    <select className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
                      <option>Inter</option>
                      <option>SF Pro Display</option>
                      <option>Roboto</option>
                      <option>Poppins</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Base Font Size</label>
                    <select className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
                      <option>14px</option>
                      <option>16px</option>
                      <option>18px</option>
                      <option>20px</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Scale Ratio</label>
                    <select className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
                      <option>1.200 (Minor Third)</option>
                      <option>1.250 (Major Third)</option>
                      <option>1.333 (Perfect Fourth)</option>
                      <option>1.414 (Augmented Fourth)</option>
                      <option>1.500 (Perfect Fifth)</option>
                      <option>1.618 (Golden Ratio)</option>
                    </select>
                  </div>
                </div>
                
                <h3 className="text-editor-text text-base font-medium mb-4">Preview</h3>
                
                <div className="space-y-6 p-5 bg-white rounded-lg border border-editor-border">
                  <div>
                    <div className="text-3xl font-bold" style={{ color: themeData.colors.text.dark }}>Heading 1</div>
                    <div className="text-sm text-editor-muted">Inter Regular 40px / 1.2</div>
                  </div>
                  
                  <div>
                    <div className="text-2xl font-bold" style={{ color: themeData.colors.text.dark }}>Heading 2</div>
                    <div className="text-sm text-editor-muted">Inter Regular 32px / 1.2</div>
                  </div>
                  
                  <div>
                    <div className="text-xl font-bold" style={{ color: themeData.colors.text.dark }}>Heading 3</div>
                    <div className="text-sm text-editor-muted">Inter Regular 24px / 1.3</div>
                  </div>
                  
                  <div>
                    <div className="text-base" style={{ color: themeData.colors.text.dark }}>Body Text. The quick brown fox jumps over the lazy dog.</div>
                    <div className="text-sm text-editor-muted">Inter Regular 16px / 1.5</div>
                  </div>
                  
                  <div>
                    <div className="text-sm" style={{ color: themeData.colors.text.dark }}>Small Text. The quick brown fox jumps over the lazy dog.</div>
                    <div className="text-sm text-editor-muted">Inter Regular 14px / 1.5</div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "components" && (
              <div className="p-6">
                <h3 className="text-editor-text text-base font-medium mb-4">Component Styling</h3>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
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
                    <label className="block text-xs text-editor-muted mb-1.5">Border Width</label>
                    <select className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
                      <option>None (0px)</option>
                      <option>Hairline (0.5px)</option>
                      <option>Thin (1px)</option>
                      <option>Medium (2px)</option>
                      <option>Thick (4px)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Default Shadow</label>
                    <select className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
                      <option>None</option>
                      <option>Small (0 1px 3px rgba(0,0,0,0.1))</option>
                      <option>Medium (0 4px 6px rgba(0,0,0,0.1))</option>
                      <option>Large (0 10px 15px rgba(0,0,0,0.1))</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Focus Ring Style</label>
                    <select className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
                      <option>Outline (2px solid primary color)</option>
                      <option>Glow (0 0 0 3px primary color + opacity)</option>
                      <option>None</option>
                    </select>
                  </div>
                </div>
                
                <h3 className="text-editor-text text-base font-medium mb-4">Component Preview</h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-editor-muted mb-1.5">Buttons</label>
                      <div className="space-y-2">
                        <button className="w-full py-2 px-4 rounded-md bg-blue-500 text-white text-sm font-medium">
                          Primary Button
                        </button>
                        <button className="w-full py-2 px-4 rounded-md bg-transparent border border-blue-500 text-blue-500 text-sm font-medium">
                          Secondary Button
                        </button>
                        <button className="w-full py-2 px-4 rounded-md bg-gray-200 text-gray-800 text-sm font-medium">
                          Tertiary Button
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-editor-muted mb-1.5">Form Elements</label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Text Input"
                          className="w-full bg-white border border-gray-300 rounded-md text-sm px-3 py-2"
                        />
                        <select className="w-full bg-white border border-gray-300 rounded-md text-sm px-3 py-2">
                          <option>Dropdown Select</option>
                        </select>
                        <div className="flex items-center">
                          <input type="checkbox" id="checkbox" className="mr-2" />
                          <label htmlFor="checkbox" className="text-sm">Checkbox</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-editor-muted mb-1.5">Cards</label>
                      <div className="p-4 bg-white rounded-md border border-gray-200 shadow-sm">
                        <div className="text-base font-medium mb-2">Card Title</div>
                        <div className="text-sm text-gray-600 mb-3">This is a sample card with the current theme styling applied.</div>
                        <button className="py-1.5 px-3 rounded-md bg-blue-500 text-white text-sm">
                          Action
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs text-editor-muted mb-1.5">Web3 Components</label>
                      <div className="p-4 bg-white rounded-md border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-base font-medium">NFT Preview</div>
                          <div className="text-sm text-blue-500">0.05 ETH</div>
                        </div>
                        <div className="h-32 bg-gray-100 rounded-md mb-3 flex items-center justify-center text-xs text-gray-400">
                          Image Preview
                        </div>
                        <button className="w-full py-1.5 px-3 rounded-md bg-blue-500 text-white text-sm">
                          Connect Wallet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "spacing" && (
              <div className="p-6">
                <h3 className="text-editor-text text-base font-medium mb-4">Global Spacing</h3>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Base Spacing Unit</label>
                    <select className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
                      <option>4px</option>
                      <option>8px</option>
                      <option>10px</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Spacing Scale</label>
                    <select className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
                      <option>Linear (n × base)</option>
                      <option>Fibonacci (1, 1, 2, 3, 5, 8, ...)</option>
                      <option>Geometric (2^n × base)</option>
                    </select>
                  </div>
                </div>
                
                <h3 className="text-editor-text text-base font-medium mb-4">Container Settings</h3>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Max Content Width</label>
                    <select className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
                      <option>1200px</option>
                      <option>1280px</option>
                      <option>1440px</option>
                      <option>1920px</option>
                      <option>100%</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-editor-muted mb-1.5">Default Padding</label>
                    <select className="w-full bg-editor-surface border border-editor-border rounded-md text-sm text-editor-text px-3 py-2">
                      <option>16px</option>
                      <option>24px</option>
                      <option>32px</option>
                      <option>48px</option>
                    </select>
                  </div>
                </div>
                
                <h3 className="text-editor-text text-base font-medium mb-4">Spacing Preview</h3>
                
                <div className="bg-white rounded-lg border border-editor-border p-4">
                  <div className="text-sm text-editor-muted mb-4">Visual representation of spacing scale:</div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-16 text-xs text-editor-muted">XS (4px)</div>
                      <div className="h-4 bg-blue-200 w-1"></div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-16 text-xs text-editor-muted">SM (8px)</div>
                      <div className="h-4 bg-blue-300 w-2"></div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-16 text-xs text-editor-muted">MD (16px)</div>
                      <div className="h-4 bg-blue-400 w-4"></div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-16 text-xs text-editor-muted">LG (24px)</div>
                      <div className="h-4 bg-blue-500 w-6"></div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-16 text-xs text-editor-muted">XL (32px)</div>
                      <div className="h-4 bg-blue-600 w-8"></div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-16 text-xs text-editor-muted">2XL (48px)</div>
                      <div className="h-4 bg-blue-700 w-12"></div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 border border-dashed border-editor-border rounded-md">
                    <div className="text-sm text-editor-muted mb-2">Component Spacing Example:</div>
                    
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-md">
                      <div className="text-sm font-medium mb-2">Card Title</div>
                      <div className="text-xs text-editor-muted mb-4">Card content with applied spacing.</div>
                      
                      <div className="flex space-x-2">
                        <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded">Button 1</button>
                        <button className="px-2 py-1 text-xs bg-white border border-blue-300 text-blue-500 rounded">Button 2</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="editor-toolbar justify-end">
          <div className="flex space-x-3">
            <button className="editor-button px-4" onClick={onClose}>
              Cancel
            </button>
            <button className="editor-button-primary px-4 flex items-center" onClick={handleApply}>
              Apply Theme
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeMapper;
