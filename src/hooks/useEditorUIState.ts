import { useState } from "react";
import { EditorUIStateReturn } from "../types/canvasUITypes";

export const useEditorUIState = (): EditorUIStateReturn => {
  const [activeTab, setActiveTab] = useState("layout");
  const [showPropertyPanel, setShowPropertyPanel] = useState(true);
  const [showAIExtractor, setShowAIExtractor] = useState(false);
  const [showThemeMapper, setShowThemeMapper] = useState(false);
  
  const handlePropertyClose = () => {
    setShowPropertyPanel(false);
  };
  
  const handlePropertyShow = () => {
    setShowPropertyPanel(true);
  };
  
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setShowPropertyPanel(true);
  };

  return {
    activeTab,
    setActiveTab,
    showPropertyPanel,
    setShowPropertyPanel,
    showAIExtractor,
    setShowAIExtractor,
    showThemeMapper,
    setShowThemeMapper,
    handlePropertyClose,
    handlePropertyShow,
    handleTabClick
  };
};
