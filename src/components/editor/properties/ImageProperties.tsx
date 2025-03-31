
import React from "react";

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

export default ImageProperties;
