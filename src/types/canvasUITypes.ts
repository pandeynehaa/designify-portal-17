
// Canvas UI state related types
export interface CanvasUIStateReturn {
  showGrid: boolean;
  editMode: boolean;
  showLeftSidebar: boolean;
  showRightSidebar: boolean;
  setShowGrid: (show: boolean) => void;
  setEditMode: (edit: boolean) => void;
  setShowLeftSidebar: (show: boolean) => void;
  setShowRightSidebar: (show: boolean) => void;
  toggleGrid: () => void;
  toggleEditMode: () => void;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
}

// Editor UI state types
export interface EditorUIStateReturn {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  showPropertyPanel: boolean;
  setShowPropertyPanel: React.Dispatch<React.SetStateAction<boolean>>;
  showAIExtractor: boolean;
  setShowAIExtractor: React.Dispatch<React.SetStateAction<boolean>>;
  showThemeMapper: boolean;
  setShowThemeMapper: React.Dispatch<React.SetStateAction<boolean>>;
  handlePropertyClose: () => void;
  handlePropertyShow: () => void;
  handleTabClick: (tab: string) => void;
}

// Device state types
export interface DeviceStateReturn {
  deviceView: string;
  setDeviceView: React.Dispatch<React.SetStateAction<string>>;
  activeTool: string;
  setActiveTool: React.Dispatch<React.SetStateAction<string>>;
}
